import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icons from '@assets/icons';
import { IconProps } from '@assets/icons/IconProps';
import { AppColors } from '@constants/AppColors';
import Home from '@screens/Home';

type BottomNavigationStackTypes = {
  Home: undefined;
  WatchList: undefined;
  Bookmark: undefined;
  TvShows: undefined;
};

const Tab = createBottomTabNavigator<BottomNavigationStackTypes>();

const BottomNavigationStack = () => {
  const setTabbarIcon = (Icon: FC<IconProps>, focused: boolean): React.ReactNode => {
    return <Icon color={focused ? AppColors.white : AppColors.white50} />;
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
        name="WatchList"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.AccessTimeIcon, focused),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.BookmarkIcon, focused),
        }}
      />
      <Tab.Screen
        name="TvShows"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => setTabbarIcon(Icons.OndemandVideoIcon, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigationStack;
