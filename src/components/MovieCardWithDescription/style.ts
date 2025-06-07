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
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingWithIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
