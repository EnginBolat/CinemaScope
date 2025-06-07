import { FC } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { TextProps } from './type';
import { AppTextType } from '@constants/AppTextType';

const Text: FC<TextProps> = props => {
  const { style, text, type = 'regularSmall12', color = 'white', ...rest } = props;

  const textStyle = StyleSheet.compose(style, AppTextType[type]);

  return (
    <RNText style={[{ color }, textStyle]} {...rest}>
      {text}
    </RNText>
  );
};

export default Text;
