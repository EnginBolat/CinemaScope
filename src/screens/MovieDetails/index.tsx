import { useMemo, useRef } from 'react';
import { Header, Text, BottomSheet, Icon } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { BASE_W500_URL } from '@constants/AppConfig';
import FastImage, { Source } from '@d11/react-native-fast-image';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';
import { useMovieCastByMovieIdQuery, useMovieDetailsByIdQuery } from '@store/slice/request';
import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native';
import GorhomBottomSheet from '@gorhom/bottom-sheet';

import { styles } from './style';
import { CastList, GenreAndReleaseDate, Overview, ProductionCompaniesList, TitleAndRating } from './components';
import { useAppDispatch, useAppSelector } from '@store/store';
import useLocalStorage from '@hooks/useLocalStorage';
import { setFavories } from '@store/slice/mainSlice';
import { scaleHeight } from '@helpers/helper';

const MovieDetails = () => {
  const { SaveToStorageJSON } = useLocalStorage();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.main.favorites);
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const route = useRoute<RouteProp<MainNavigationStackType, 'MovieDetails'>>();
  const { movie } = route?.params;
  const {
    data: movieDetails,
    isLoading: movieDetailsIsLoading,
    error: movieDetailsError,
  } = useMovieDetailsByIdQuery(movie.id.toString());

  const {
    data: movieCast,
    isLoading: movieCastLoading,
    error: movieCastError,
  } = useMovieCastByMovieIdQuery(movie.id.toString());

  const isPageLoading = movieCastLoading || movieDetailsIsLoading;
  const isPageHaveError = movieCastError || movieDetailsError;

  const heroImage: Source = useMemo(() => {
    return { uri: BASE_W500_URL + movieDetails?.backdrop_path, priority: FastImage.priority.high, cache: 'cacheOnly' };
  }, [movie, movieDetails]);

  const handleAddFavorites = (id: string) => {
    const isMovieExist = favorites.includes(id);
    const newFavorites = isMovieExist ? favorites.filter(favId => favId !== id) : [...favorites, id];
    dispatch(setFavories(newFavorites));
    SaveToStorageJSON('FAVORITES', newFavorites);
    if (!isMovieExist) bottomSheetRef.current?.expand();
  };

  const Loading = () => (
    <View style={[styles.f1, styles.alignItemCenter]}>
      <ActivityIndicator color={AppColors.white} />
    </View>
  );

  return (
    <>
      <View style={[styles.f1, styles.container]}>
        <Header
          isHaveHeader={false}
          rightIconName={favorites.includes(movie.id.toString()) ? 'HeartFilled' : 'HeartOutline'}
          rightIconOnPress={() => handleAddFavorites(movie.id.toString())}
        />
        <ScrollView
          style={{ flex: 1, marginBottom: scaleHeight(24) }}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}>
          {isPageLoading && <Loading />}
          {!isPageHaveError && !isPageLoading && (
            <>
              <FastImage source={heroImage} style={styles.heroImage} />
              <TitleAndRating title={movie.title} voteAverage={movieDetails?.vote_average ?? movie.vote_average} />
              <GenreAndReleaseDate genres={movieDetails?.genres} releaseDate={movieDetails?.release_date} />
              <Overview overview={movie.overview} />
              <CastList cast={movieCast?.cast} />
              <ProductionCompaniesList companies={movieDetails?.production_companies} />
            </>
          )}
        </ScrollView>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.close()}
        height={['25']}
        enableDynamicSizing={false}
        timeout={3}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, gap: 32 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 18 }}>
          <Icon name="HeartFilled" color="#ff002b" size={44} />
          <Text text="Film Başarıyla Favorilere Eklendi" color="black" type="mediumBody16" />
        </View>
      </BottomSheet>
    </>
  );
};

export default MovieDetails;
