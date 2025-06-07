import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth } from '@helpers/helper.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 4,
    height: scaleHeight(200),
    width: scaleWidth(120),
  },
  textContainer: {
    gap: 12,
    paddingRight: STATIC_PADDING,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingWithIconRow: {
    flexDirection: 'row',
  },
});