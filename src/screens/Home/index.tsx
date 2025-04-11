import { useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';

import { Header, Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { useGetPopularContentQuery } from '@store/slice/request';
import { Popular } from '@models/Popular';
import { STATIC_PADDING } from '@constants/AppConstants';
import MovieCard from '@components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainNavigationStackType>>();
  const { data: popularContentData, isError, isLoading } = useGetPopularContentQuery();

  const Loader = useCallback(() => {
    if (isLoading) return <ActivityIndicator />;
  }, [isLoading]);

  const renderItem = ({ item }: { item: Popular }) => (
    <MovieCard item={item} onPress={() => navigation.navigate('MovieDetails', { movie: item })} />
  );

  return (
    <SafeAreaView style={{ backgroundColor: AppColors.primary, alignItems: 'center', flex: 1 }}>
      <Header isHaveHeader={true} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingTop: 18,
        }}>
        <Loader />
        {popularContentData && (
          <>
            <View style={{ marginLeft: STATIC_PADDING, marginBottom: 12 }}>
              <Text type="mediumCaption14" text="Keşfet" />
            </View>
            <FlatList
              data={popularContentData.results}
              renderItem={renderItem}
              horizontal
              contentContainerStyle={{ gap: 8, paddingHorizontal: STATIC_PADDING }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
