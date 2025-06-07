import { StyleSheet } from 'react-native';
import { AppColors } from '@constants/AppColors.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    flex: 1,
  },
  tabContainer: {
    padding: STATIC_PADDING,
    width: '100%',
    alignItems: 'center',
  },
  listStyle: {
    flexGrow: 1,
    width: '100%',
    marginBottom: 32,
  },
  listContainerStyle: {
    paddingHorizontal: STATIC_PADDING,
    flexGrow: 1,
    gap: 18,
    width: '70%',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default styles;
