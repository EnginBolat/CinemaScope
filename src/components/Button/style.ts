import { AppColors } from '@constants/AppColors';
import { StyleSheet } from 'react-native';

export const rawStyle = (disabled?: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 12,
      paddingVertical: 14,
      backgroundColor: disabled ? AppColors.secondaryGhost : AppColors.secondary,
      width: '100%',
      alignItems: 'center',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    text: {
      color: AppColors.white,
      paddingHorizontal: 7,
    },
  });
