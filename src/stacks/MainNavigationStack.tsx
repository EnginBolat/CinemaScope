import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '@screens/Onboard';
import React, { useEffect, useState } from 'react';
import BottomNavigationStack from './BottomNavigationStack';
import useLocalStorage from '@hooks/useLocalStorage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppColors } from '@constants/AppColors';

export type MainNavigationStackType = {
  Onboard: undefined;
  BottomNavigation: undefined;
};

const MainNavigationStack = () => {
  const { GetFromStorage } = useLocalStorage();
  const MainNavigation = createNativeStackNavigator<MainNavigationStackType>();
  const [initialRoute, setInitialRoute] = useState<keyof MainNavigationStackType | null>(null);

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
