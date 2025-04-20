import { useCallback } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, View } from 'react-native';

import { Header, Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { useGetPopularContentQuery, useNowPlayingMovieQuery, useUpcomingMovieQuery } from '@store/slice/request';
import { Popular } from '@models/Popular';
import { STATIC_PADDING } from '@constants/AppConstants';
import MovieCard from '@components/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainNavigationStackType>>();
  const insets = useSafeAreaInsets();
  const { data: popularContentData, isError: popularError, isLoading: popularLoading } = useGetPopularContentQuery();
  const {
    data: nowePlayingContentData,
    isError: nowPlayingError,
    isLoading: nowPlayingLoading,
  } = useNowPlayingMovieQuery(1);

  const {
    data: upcomingMovies,
    isError: upcomingMovieError,
    isLoading: upcomingMovieLoading,
  } = useUpcomingMovieQuery(1);

  const Loader = useCallback(() => {
    if (nowPlayingLoading || popularLoading || upcomingMovieLoading) return <ActivityIndicator />;
  }, [nowPlayingLoading, popularLoading, upcomingMovieLoading]);

  const renderItem = ({ item }: { item: Popular }) => (
    <MovieCard item={item} onPress={() => navigation.navigate('MovieDetails', { movie: item })} />
  );

  return (
    <View style={{ backgroundColor: AppColors.primary, alignItems: 'center', flex: 1 }}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
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
                <Text type="mediumHeading620" text="Keşfet" />
              </View>
              <FlatList
                data={popularContentData.results}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingHorizontal: STATIC_PADDING }}
              />
            </>
          )}
          {nowePlayingContentData && (
            <>
              <View style={{ marginLeft: STATIC_PADDING, marginVertical: 24 }}>
                <Text type="mediumHeading620" text="Now Playing" />
              </View>
              <FlatList
                data={nowePlayingContentData.results}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingHorizontal: STATIC_PADDING }}
              />
            </>
          )}
          {upcomingMovies && (
            <>
              <View style={{ marginLeft: STATIC_PADDING, marginVertical: 24 }}>
                <Text type="mediumHeading620" text="Upcoming" />
              </View>
              <FlatList
                data={upcomingMovies.results}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingHorizontal: STATIC_PADDING }}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
