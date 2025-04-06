import { AppColors } from "@constants/AppColors";
import { StyleSheet } from "react-native";

export const rawStyle = (disabled?: boolean) =>
    StyleSheet.create({
        container: {
            paddingHorizontal: 12,
            paddingVertical: 18,
            backgroundColor: disabled ? AppColors.secondaryGhost : AppColors.secondary,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 8,
        },
        text: {
            color: AppColors.white,
        },
    });
