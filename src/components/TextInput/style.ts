import { StyleSheet } from 'react-native';
import { AppColors } from '@constants/AppColors.ts';
import { scaleHeight } from '@helpers/helper.ts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.white50,
    padding: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
    height: scaleHeight(48),
  },
  iconContainer: {
    justifyContent: 'center',
  },
  f1: {
    flex: 1,
  },
});
