import { AppColors } from "@constants/AppColors";
import { STATIC_PADDING } from "@constants/AppConstants";
import { scaleHeight, scaleWidth } from "@helpers/helper";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: STATIC_PADDING,
    paddingBottom: STATIC_PADDING,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
  },
  image: {
    width: '125%'
  },
  textContainer: {
    gap: scaleWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleHeight(48),
  },
  text: {
    color: AppColors.white,
    textAlign: 'center',
  },
  button: {
    marginBottom: useSafeAreaInsets().bottom,
    bottom: 0,
    width: '100%',
    flex: 1,
    position: 'absolute',
  }
});
