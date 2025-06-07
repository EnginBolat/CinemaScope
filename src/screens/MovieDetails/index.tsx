import { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, View } from 'react-native';
import FastImage, { Source } from '@d11/react-native-fast-image';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useMovieCastByMovieIdQuery, useMovieDetailsByIdQuery } from '@hooks/useMovieRequest.ts';
import useLocalStorage from '@hooks/useLocalStorage';
import { Header, BottomSheet, Button } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { BASE_W500_URL } from '@constants/AppConfig';
import { useAppDispatch, useAppSelector } from '@store/store';
import { MainNavigationStackType } from '@stacks/MainNavigationStack';
import { IFavoriteAndWatchLater, setFavories, setWatchLater } from '@store/slice/mainSlice';
import { translate } from '@core/i18n';

import GorhomBottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './style';

import {
  CastList,
  GenreAndReleaseDate,
  Overview,
  ProductionCompaniesList,
  TitleAndRating,
  WatchListBottomSheetBody,
  AddFavoriteBottomSheetBody,
} from './components';

const MovieDetails = () => {
  const { SaveToStorageJSON } = useLocalStorage();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const { favorites, watchLater } = useAppSelector(state => state.main);
  const watchListBottomSheetRef = useRef<GorhomBottomSheet>(null);
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

  // Logic

  const isPageLoading = movieCastLoading || movieDetailsIsLoading;

  const handleAddFavorites = (id: string) => {
    const isFavoriteExist = favorites.some(item => item.id?.toString() === id);
    const newUpdatedArray: IFavoriteAndWatchLater[] = isFavoriteExist
      ? favorites.filter(item => item.id?.toString() !== id)
      : [
          ...favorites,
          {
            type: 'tvShow',
            ...movie!,
          },
        ];

    dispatch(setFavories(newUpdatedArray));
    SaveToStorageJSON('FAVORITES', newUpdatedArray);
    if (!isFavoriteExist) bottomSheetRef.current?.expand();
  };

  const handleAddWatchList = (id: string) => {
    const isItemExistInWatchList = watchLater.some(item => item?.id?.toString() === id);
    const newUpdatedArray: IFavoriteAndWatchLater[] = isItemExistInWatchList
      ? watchLater.filter(item => item?.id?.toString() !== id)
      : [
          ...watchLater,
          {
            type: 'tvShow',
            ...movie!,
          },
        ];
    dispatch(setWatchLater(newUpdatedArray));
    SaveToStorageJSON('WATCHLATER', newUpdatedArray);
    if (!isItemExistInWatchList) watchListBottomSheetRef.current?.expand();
  };

  const watchLaterButtonText = watchLater.some(item => item?.id?.toString() === movie.id.toString())
    ? translate('app.details.removeWatchLater')
    : translate('app.details.addWatchList');

  const rightIconName = useMemo(() => {
    if (isPageLoading) return undefined;
    if (favorites.some(item => item?.id?.toString() === movie.id.toString())) return 'HeartFilled';
    return 'HeartOutline';
  }, [isPageLoading, favorites]);

  // Components

  const HeroImage = useCallback(() => {
    const hero: Source = {
      uri: BASE_W500_URL + movieDetails?.backdrop_path,
      priority: FastImage.priority.normal,
      cache: 'immutable',
    };

    return <FastImage source={hero} style={styles.heroImage} />;
  }, [movie, movieDetails]);

  const Loading = () => (
    <View style={[styles.f1, styles.alignItemCenter]}>
      <ActivityIndicator color={AppColors.white} />
    </View>
  );

  return (
    <View style={styles.rootContainer}>
      <Header
        isHaveHeader={false}
        rightIconName={rightIconName}
        rightIconOnPress={() => handleAddFavorites(movie.id.toString())}
      />
      <SafeAreaView style={styles.rootContainer}>
        <ScrollView
          style={styles.rootContainer}
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {isPageLoading && <Loading />}
          {!isPageLoading && (
            <>
              <HeroImage />
              <TitleAndRating title={movie.title} voteAverage={movieDetails?.vote_average ?? movie.vote_average} />
              <View style={styles.addWatchListButtonContainer}>
                <Button
                  onPress={() => handleAddWatchList(movie.id.toString())}
                  text={watchLaterButtonText}
                  leftIcon="AccessTimeIcon"
                />
              </View>
              <GenreAndReleaseDate genres={movieDetails?.genres} releaseDate={movieDetails?.release_date} />
              <Overview overview={movie.overview} />
              <CastList cast={movieCast?.cast} />
              <ProductionCompaniesList companies={movieDetails?.production_companies} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={bottomSheetRef}
        onClose={() => bottomSheetRef.current?.close()}
        contentContainerStyle={styles.bottomSheetContentContainer}>
        <AddFavoriteBottomSheetBody onPress={() => bottomSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={watchListBottomSheetRef}
        onClose={() => watchListBottomSheetRef.current?.close()}
        enableDynamicSizing={true}
        contentContainerStyle={styles.bottomSheetContentContainer}>
        <WatchListBottomSheetBody onPress={() => watchListBottomSheetRef.current?.close()} />
      </BottomSheet>
    </View>
  );
};

export default MovieDetails;
