import { FC } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { TextProps } from './type';
import { AppTextType } from '@constants/AppTextType';

const Text: FC<TextProps> = props => {
  const { style, text, type = 'regularSmall12', color = 'white' } = props;

  const textStyle = StyleSheet.compose(AppTextType[type], style);

  return <RNText style={textStyle}>{text}</RNText>;
};

export default Text;
