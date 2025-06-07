import { IconType } from '@assets/icons';
import { AppTextType } from '@constants/AppTextType';
import { TextStyle, TouchableOpacityProps } from 'react-native';

export interface IButton extends TouchableOpacityProps {
  leftIcon?: IconType;
  text: string;
  loading?: boolean;
  textStyle?: TextStyle;
  textType?: keyof typeof AppTextType;
}
