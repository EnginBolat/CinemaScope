import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { Pressable, TextInput as RNTextInput, View } from 'react-native';

import { scaleHeight } from '@helpers/helper.ts';
import { Icon } from '@components/index.ts';

import { TextInput as CustomTextInputProps } from './type';
import { styles } from './style';
import { IconType } from '@assets/icons';

const TextInput = forwardRef<RNTextInput, CustomTextInputProps>((props, ref) => {
  const {
    value,
    onChangeText,
    onPress,
    leftIconName,
    showLeftIcon,
    leftIconOnPress,
    leftIconColor,
    rightIconName,
    showRightIcon,
    rightIconOnPress,
    rightIconColor,
    ...rest
  } = props;

  const innerRef = useRef<RNTextInput>(null);
  useImperativeHandle(ref, () => innerRef.current as RNTextInput);

  const isShownRightIcon = useMemo(() => (value?.length ?? 0 > 0) && showRightIcon, [value, showRightIcon]);

  type PressableIconProps = {
    onPress?: () => void;
    icon?: IconType;
    color?: string;
  };
  const PressableIcon = ({ onPress, icon, color }: PressableIconProps) => (
    <Pressable onPress={onPress} style={styles.iconContainer}>
      <Icon name={icon || 'Search'} size={scaleHeight(20)} color={color ?? 'grey'} />
    </Pressable>
  );

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        {showLeftIcon && <PressableIcon onPress={leftIconOnPress} icon={leftIconName} color={leftIconColor} />}
        <RNTextInput
          ref={innerRef}
          onChangeText={onChangeText}
          value={value}
          style={styles.f1}
          maxLength={120}
          {...rest}
        />
        {isShownRightIcon && <PressableIcon onPress={rightIconOnPress} icon={rightIconName} color={rightIconColor} />}
      </View>
    </Pressable>
  );
});

export default TextInput;
