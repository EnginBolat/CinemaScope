import { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";

export interface BottomSheetProps extends PropsWithChildren {
  enableDynamicSizing?: boolean;
  onClose: () => void;
  enablePanDownToClose?: boolean;
  containerHeight?: number | string | undefined;
  contentContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  height?: number[] | string[];
  timeout?: number
}
