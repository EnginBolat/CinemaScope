import { FC, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';

import Icons from '@assets/icons';
import { IconProps } from '@assets/icons/IconProps';

import { AppColors } from '@constants/AppColors';
import useLocalStorage from '@hooks/useLocalStorage';
import { IFavoriteAndWatchLater, setFavories } from '@store/slice/mainSlice';
import { Home, Search, WatchList } from '@screens/index';
import NetworkLog from '@screens/NetworkLog';
import { scaleHeight, scaleWidth } from '@helpers/helper.ts';

type BottomNavigationStackTypes = {
  Home: undefined;
  WatchList: undefined;
  Bookmark: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigationStackTypes>();

const BottomNavigationStack = () => {
  const dispatch = useDispatch();
  const { GetFromStorageJSON } = useLocalStorage();

  useEffect(() => {
    const getFavorites = async () => {
      const values = await GetFromStorageJSON<IFavoriteAndWatchLater[]>('FAVORITES');
      if (values) dispatch(setFavories(values));
    };

    getFavorites();
  }, []);

  const setTabbarIcon = (Icon: FC<IconProps>, focused: boolean): React.ReactNode => {
    return <Icon color={focused ? AppColors.white : AppColors.white50} height={scaleHeight(32)} width={scaleWidth(32)} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        title: '',
        headerShown: false,
        tabBarStyle: { backgroundColor: AppColors.primary, borderTopWidth: 0 },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.HomeIcon, focused),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.Search, focused),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.AccessTimeIcon, focused),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={NetworkLog}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.BookmarkIcon, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationStack;
