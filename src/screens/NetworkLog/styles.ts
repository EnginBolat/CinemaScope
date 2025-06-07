import { StyleSheet } from 'react-native';
import { AppColors } from '@constants/AppColors.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: AppColors.primary,
    flex: 1,
    marginHorizontal: STATIC_PADDING,
    gap: 24,
  },
  flatListStyle: {
    backgroundColor: AppColors.primary,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.primary,
  },
  logBox: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
  },
  logBoxTitleRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  type: {
    fontWeight: 'bold',
    color: '#61dafb',
  },
  url: {
    color: '#ffffff',
    marginVertical: 4,
  },
  data: {
    color: '#fff',
    fontSize: 12,
  },
  renderItemButtonContainer: {
    backgroundColor: AppColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  renderItemButtonText: {
    color: AppColors.white,
    fontWeight: 'bold',
  },
  keyValueContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  keyText: {
    color: 'red',
    fontWeight: 'bold',
  },
  valueText: {
    color: 'white',
    marginLeft: 6,
  },
  expandedContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: AppColors.white50,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  expandedIndexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
