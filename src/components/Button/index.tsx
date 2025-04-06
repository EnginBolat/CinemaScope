import { FC, useMemo } from 'react';
import { IButton } from './type';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { AppColors } from '@constants/AppColors';
import Text from '@components/Text';
import { rawStyle } from './style';

const Button: FC<IButton> = props => {
  const { onPress, text, loading, textStyle, disabled, textType = 'regularBody16' } = props;

  const isDisabled = useMemo(() => loading || disabled, [loading, disabled]);
  const style = rawStyle(isDisabled);

  return (
    <TouchableOpacity onPress={onPress} style={style.container} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={AppColors.white} />
      ) : (
        <Text type={textType} text={text} style={[textStyle, style.text]} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
