import { FC, useMemo } from 'react';
import { IButton } from './type';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppColors } from '@constants/AppColors';
import Text from '@components/Text';
import { rawStyle } from './style';
import Icon from '@components/Icon';

const Button: FC<IButton> = props => {
  const { onPress, text, loading, textStyle, disabled, style, textType = 'regularBody16', leftIcon } = props;

  const isDisabled = useMemo(() => loading || disabled, [loading, disabled]);
  const innerStyle = rawStyle(isDisabled);

  return (
    <TouchableOpacity onPress={onPress} style={[innerStyle.container, style]} disabled={disabled}>
      {leftIcon && <Icon name={leftIcon} height={24} width={24} />}
      {loading ? (
        <ActivityIndicator color={AppColors.white} />
      ) : (
        <Text type={textType} text={text} style={[textStyle, innerStyle.text]} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
