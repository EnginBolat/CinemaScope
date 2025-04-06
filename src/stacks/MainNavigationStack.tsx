import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard from '@screens/Onboard';

import React from 'react';
import BottomNavigationStack from './BottomNavigationStack';

export type MainNavigationStackType = {
  Onboard: undefined;
  BottomNavigation: undefined;
};

const MainNavigationStack = () => {
  const MainNavigation = createNativeStackNavigator<MainNavigationStackType>();

  return (
    <MainNavigation.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboard">
      <MainNavigation.Screen name="Onboard" component={Onboard} />
      <MainNavigation.Screen name="BottomNavigation" component={BottomNavigationStack} />
    </MainNavigation.Navigator>
  );
};

export default MainNavigationStack;
