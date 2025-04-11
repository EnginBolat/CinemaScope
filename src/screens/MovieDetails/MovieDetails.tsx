import { Header, Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';
import { SafeAreaView, View } from 'react-native';

const MovieDetails = () => {
  const route = useRoute<RouteProp<MainNavigationStackType, 'MovieDetails'>>();
  const { movie } = route?.params;

  if (!movie) {
    return <View />;
  }
  return (
    <SafeAreaView style={{ backgroundColor: AppColors.primary, flex: 1 }}>
      <Header isHaveHeader={true} />
      <Text type="regularSmall12" text={movie.overview} />
    </SafeAreaView>
  );
};

export default MovieDetails;
