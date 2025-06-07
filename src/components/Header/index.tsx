import React, { useMemo, useRef, useState } from 'react';
import { Image, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import Images from '@assets/images';
import { scale, scaleHeight, scaleWidth } from '@helpers/helper';
import { Text, Icon } from '@components/index';
import { useNavigation } from '@react-navigation/native';
import { AppColors } from '@constants/AppColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_TEST } from '@constants/AppConfig';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NetworkLog from '@screens/NetworkLog';

import { IHeaderProps } from './types';
import { styles } from './styles';

const STATIC_MAX_CLICK_FOR_LOG = 5;

const Header = (props: IHeaderProps) => {
  const {
    isHaveHeader = true,
    title,
    titleType = 'boldHeading620',
    leftIconName,
    leftIconOnPress,
    leftIconShown = true,
    rightIconName,
    rightIconOnPress,
  } = props;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const canGoBack = navigation.canGoBack();
  const [clickCounter, setClickCounter] = useState<number>(0);

  const handleClick = () => {
    if (IS_TEST && clickCounter <= STATIC_MAX_CLICK_FOR_LOG) setClickCounter(prev => prev + 1);
    else if (IS_TEST && clickCounter >= STATIC_MAX_CLICK_FOR_LOG) {
      bottomSheetModalRef.current?.present();
      setClickCounter(0);
    }
  };

  const showLeftIcon = useMemo(() => {
    if (!leftIconShown) return;
    else if (leftIconName || canGoBack) return true;
    return false;
  }, [leftIconShown, leftIconName, canGoBack]);

  const innerLeftIconOnPress = () => {
    if (leftIconOnPress) leftIconOnPress();
    if (canGoBack) navigation.goBack();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleClick}>
        <View style={[styles.container, { marginTop: insets.top }]}>
          {showLeftIcon && (
            <TouchableOpacity onPress={innerLeftIconOnPress} style={styles.leftIconContainer}>
              <Icon name="ChevronLeft" color={AppColors.white} size={scale(32)} />
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
      </TouchableWithoutFeedback>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDynamicSizing={false}
        snapPoints={['100%']}
        handleIndicatorStyle={styles.bgColorPrimary}
        backgroundStyle={styles.bgColorPrimary}>
        <SafeAreaView style={styles.f1}>
          <NetworkLog />
        </SafeAreaView>
      </BottomSheetModal>
    </>
  );
};

export default Header;
