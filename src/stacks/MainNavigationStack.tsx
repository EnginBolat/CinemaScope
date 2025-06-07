import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '@screens/Onboard';
import React, { useEffect, useState } from 'react';
import BottomNavigationStack from './BottomNavigationStack';
import useLocalStorage from '@hooks/useLocalStorage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppColors } from '@constants/AppColors';
import MovieDetails from '@screens/MovieDetails/';
import { Popular } from '@models/Popular';
import { useDispatch } from 'react-redux';
import { setFavories, setWatchLater } from '@store/slice/mainSlice';
import { api } from '@store/slice/request.ts';

export enum MainNavigationpPages {
  Onboard = 'Onboard',
  BottomNavigation = 'BottomNavigation',
  MovieDetails = 'MovieDetails',
}

export type MainNavigationStackType = {
  Onboard: undefined;
  BottomNavigation: undefined;
  MovieDetails: {
    movie: Popular;
  };
};

const MainNavigationStack = () => {
  const dispatch = useDispatch();
  const { GetFromStorage } = useLocalStorage();
  const MainNavigation = createNativeStackNavigator<MainNavigationStackType>();
  const [initialRoute, setInitialRoute] = useState<keyof MainNavigationStackType | null>(null);

  useEffect(() => {
    const setupFavorites = async () => {
      const favorites = await GetFromStorage<string>('FAVORITES');
      if (favorites) {
        dispatch(setFavories(JSON.parse(favorites)));
      }
    };
    const setupWatchLater = async () => {
      const watchLater = await GetFromStorage<string>('WATCHLATER');
      if (watchLater) {
        dispatch(setWatchLater(JSON.parse(watchLater)));
      }
    };

    setupFavorites();
    setupWatchLater();
  }, []);

  useEffect(() => {
    dispatch(api.util.resetApiState());
  }, []);

  useEffect(() => {
    const getIsSawOnboard = async () => {
      const val = await GetFromStorage('ONBOARD');
      if (val === 'TRUE') {
        setInitialRoute('BottomNavigation');
      } else {
        setInitialRoute('Onboard');
      }
    };

    getIsSawOnboard();
  }, []);

  if (!initialRoute) {
    return (
      <View style={style.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <MainNavigation.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <MainNavigation.Screen name="Onboard" component={Onboard} />
      <MainNavigation.Screen name="BottomNavigation" component={BottomNavigationStack} />
      <MainNavigation.Screen name="MovieDetails" component={MovieDetails} />
    </MainNavigation.Navigator>
  );
};

export default MainNavigationStack;

const style = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primary,
  },
});
