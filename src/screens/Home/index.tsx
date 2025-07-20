import { useCallback } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNavigationpPages, MainNavigationStackType } from '@stacks/MainNavigationStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { useGetPopularContentQuery, useNowPlayingMovieQuery, useUpcomingMovieQuery } from '@hooks/useMovieRequest.ts';
import { Popular } from '@models/Popular';
// asdasd
import { ContentHorizontalScrollableList } from './components';

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<MainNavigationStackType>>();

  const { data: popularContentData, isLoading: popularLoading } = useGetPopularContentQuery();
  const { data: nowPlayingContentData, isLoading: nowPlayingLoading } = useNowPlayingMovieQuery(1);
  const { data: upcomingMovies, isLoading: upcomingMovieLoading } = useUpcomingMovieQuery(1);

  const Loader = useCallback(() => {
    if (nowPlayingLoading || popularLoading || upcomingMovieLoading) return <ActivityIndicator />;
    return null;
  }, [nowPlayingLoading, popularLoading, upcomingMovieLoading]);

  const onPressItem = useCallback((item: Popular) => {
    navigation.navigate(MainNavigationpPages.MovieDetails, { movie: item });
  }, []);

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: AppColors.primary }}
      contentContainerStyle={{ paddingBottom: insets.bottom, backgroundColor: AppColors.primary }}>
      <Header isHaveHeader={true} leftIconShown={false} />
      <Loader />
      {popularContentData && (
        <ContentHorizontalScrollableList
          title="Keşfet"
          contentList={popularContentData.results}
          onPressItem={onPressItem}
        />
      )}
      {nowPlayingContentData && (
        <ContentHorizontalScrollableList
          title="Now Playing"
          contentList={nowPlayingContentData.results}
          onPressItem={onPressItem}
        />
      )}
      {upcomingMovies && (
        <ContentHorizontalScrollableList
          title="Upcoming"
          contentList={upcomingMovies.results}
          onPressItem={onPressItem}
        />
      )}
    </ScrollView>
  );
};

export default Home;
