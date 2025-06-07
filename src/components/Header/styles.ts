import { AppColors } from '@constants/AppColors';
import { scaleHeight, scaleWidth } from '@helpers/helper';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleHeight(72),
    paddingHorizontal: scaleWidth(20),
    backgroundColor: AppColors.primary,
    flexDirection: 'row',
  },
  titleColor: {
    color: 'white',
  },
  image: {
    height: scaleHeight(64),
    width: scaleWidth(64),
    position: 'absolute',
    left: '50%',
  },
  leftIconContainer: {
    position: 'absolute',
    left: 18,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 18,
  },
  f1: {
    flex: 1,
  },
  bgColorPrimary: {
    backgroundColor: AppColors.primary,
  },
});
