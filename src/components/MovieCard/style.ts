import { scaleWidth, scaleHeight } from "@helpers/helper";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
    width: scaleWidth(128),
  },
  image: {
    height: scaleHeight(220),
    width: scaleWidth(128),
    borderRadius: 4,
  },
  textContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 4,
    color: 'white',
    flexShrink: 1
  }
});
