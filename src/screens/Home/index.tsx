import { Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { SafeAreaView } from 'react-native';

const Home = () => (
  <SafeAreaView style={{ backgroundColor: AppColors.primary, alignItems: 'center', flex: 1 }}>
    <Text text="Home" />
  </SafeAreaView>
);

export default Home;
