import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';
import { IconType } from '@assets/icons';

export interface TextInput extends TextInputProps {
  showLeftIcon?: boolean;
  leftIconName?: IconType;
  leftIconOnPress?: () => void;
  leftIconColor?: string;
  showRightIcon?: boolean;
  rightIconName?: IconType;
  rightIconOnPress?: () => void;
  rightIconColor?: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
}
