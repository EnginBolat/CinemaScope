import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { IHeaderProps } from './types';
import Images from '@assets/images';
import { scale, scaleHeight, scaleWidth } from '@helpers/helper';
import Text from '@components/Text';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import ChevronLeft from '@assets/icons/ChevronLeft';
import { AppColors } from '@constants/AppColors';
import Icon from '@components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = (props: IHeaderProps) => {
  const {
    isHaveHeader = true,
    title,
    titleType = 'boldHeading620',
    leftIconName,
    leftIconOnPress,
    rightIconName,
    rightIconOnPress,
  } = props;
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const showLeftIcon = () => {
    if (leftIconName || canGoBack) return true;
    return false;
  };

  const innerLeftIconOnPress = () => {
    if (leftIconOnPress) {
      leftIconOnPress();
      return;
    }
    if (canGoBack) navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      {showLeftIcon() && (
        <TouchableOpacity onPress={innerLeftIconOnPress} style={styles.leftIconContainer}>
          <ChevronLeft color={AppColors.white} size={scale(32)} />
        </TouchableOpacity>
      )}
      {title && !isHaveHeader && <Text type={titleType} text={title} style={styles.titleColor} />}
      {isHaveHeader && !title && (
        <Image
          source={Images.logo}
          resizeMethod="resize"
          resizeMode="contain"
          height={scaleHeight(64)}
          width={scaleWidth(64)}
          style={[styles.image, { transform: [{ translateX: -scaleWidth(64) / 6 }] }]}
        />
      )}
      {rightIconName && (
        <TouchableOpacity onPress={rightIconOnPress} style={styles.rightIconContainer}>
          <Icon size={24} name={rightIconName} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(Header);
