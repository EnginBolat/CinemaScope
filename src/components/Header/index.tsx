import React, { useMemo, useState } from 'react';
import { Alert, Image, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
import { useAppDispatch } from '@store/store';
import { setFavories, setWatchLater } from '@store/slice/mainSlice';
import { IS_TEST } from '@constants/AppConfig';
import useLocalStorage from '@hooks/useLocalStorage.ts';

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
  const { RemoveFromStorage } = useLocalStorage();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const dispatch = useAppDispatch();

  const [clickCounter, setClickCounter] = useState<number>(0);

  const handleClick = () => {
    if (IS_TEST && clickCounter <= 10) setClickCounter(prev => prev + 1);
    else if (IS_TEST && clickCounter >= 10) {
      Alert.alert('State Sıfırlama Aracı', '', [
        {
          text: 'Favoriler',
          onPress: async () => {
            dispatch(setFavories([]));
            setClickCounter(0);
            await RemoveFromStorage('FAVORITES');
          },
        },
        {
          text: 'Daha Sonra İzle',
          onPress: async () => {
            dispatch(setWatchLater([]));
            setClickCounter(0);
            await RemoveFromStorage('WATCHLATER');
          },
        },
        {
          text: 'İptal',
          style: 'cancel',
        },
      ]);
    }
  };

  const showLeftIcon = useMemo(() => {
    if (!leftIconShown) return;
    if (leftIconName || canGoBack) return true;
    return false;
  }, []);

  const innerLeftIconOnPress = () => {
    if (leftIconOnPress) {
      leftIconOnPress();
      return;
    }
    if (canGoBack) navigation.goBack();
  };

  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={[styles.container, { marginTop: insets.top }]}>
        {showLeftIcon && (
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
    </TouchableWithoutFeedback>
  );
};

export default Header;
