import { AppColors } from "@constants/AppColors";
import { scaleHeight, scaleWidth } from "@helpers/helper";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleHeight(72),
        paddingHorizontal: scaleWidth(20),
        backgroundColor: AppColors.primary,
    },
    titleColor: {
        color: 'white',
    },
    image: {
        height: scaleHeight(64),
        width: scaleWidth(64),
    },
});
