import { ViewStyle } from 'react-native';

export type TabButtonType = {
  title: string;
};

export type ITabSwitch = {
  buttons: TabButtonType[];
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
};

export type IDimensions = {
  height: number;
  width: number;
};
