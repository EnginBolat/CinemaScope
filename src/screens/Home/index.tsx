
import { SafeAreaView } from 'react-native';
import { Header } from '@components/index';
import { AppColors } from '@constants/AppColors';

const Home = () => (
  <SafeAreaView style={{ backgroundColor: AppColors.primary, alignItems: 'center', flex: 1 }}>
    <Header isHaveHeader={true} />
  </SafeAreaView>
);

export default Home;
