import { StyleSheet } from 'react-native';
import { AppColors } from '@constants/AppColors.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';

export const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  container: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
  },
  containerBody: {
    justifyContent: 'center',
  },
  contentTitle: {
    marginLeft: STATIC_PADDING,
    marginVertical: 24,
  },
  contentListContainerStyle: {
    gap: 8,
    paddingHorizontal: STATIC_PADDING,
  },
});
