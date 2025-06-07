import { Popular } from '@models/Popular';
import { StyleProp, ViewStyle } from 'react-native';
import { ImageStyle } from '@d11/react-native-fast-image/src';

export type IMovileCardProps = {
  item: Popular;
  onPress: (item: Popular) => void;
  imageStyle?: StyleProp<ImageStyle>,
  containerStyle?: ViewStyle
};
