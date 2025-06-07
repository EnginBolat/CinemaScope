import { StyleSheet } from 'react-native';
import { AppColors } from '@constants/AppColors.ts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primaryDark,
    borderRadius: 20,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.2)',
  },
  selectionContainer: {
    position: 'absolute',
    backgroundColor: AppColors.primary,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  textContainer: {
    flexDirection: 'row',
  },
  title: {
    color: AppColors.white,
    alignSelf: 'center',
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});

export default styles;
