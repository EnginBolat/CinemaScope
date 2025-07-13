import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, TextInput as RNTextInput, View } from 'react-native';

import { AppColors } from '@constants/AppColors.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';
import { MovieCardWithDescription, Text, TextInput } from '@components/index.ts';
import useDebounce from '@hooks/useDebounce';
import { useGetSearchResultsQuery } from '@hooks/useCustomRequest.ts';
import { useGetPopularContentQuery } from '@hooks/useMovieRequest.ts';
import { MainNavigationpPages, MainNavigationStackType } from '@stacks/MainNavigationStack.tsx';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Search = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainNavigationStackType>>();

  const [keyword, setKeyword] = useState<string>('');
  const searchInputRef = useRef<RNTextInput>(null);

  const debounceSearchTerm = useDebounce(keyword, 200);
  const shouldTriggerSearch = useMemo(() => debounceSearchTerm.trim().length >= 1, [debounceSearchTerm, keyword]);
  const {
    data: searchResults,
    error,
    isLoading,
  } = useGetSearchResultsQuery(
    {
      query: debounceSearchTerm,
      page: 1,
    },
    { skip: debounceSearchTerm.trim().length >= 1 },
  );

  const { data: popularContentData, isLoading: popularLoading } = useGetPopularContentQuery();

  useEffect(() => {
    if (error) console.warn('API Error:', error);
  }, [error]);

  const handleSearchBarOnPress = () => searchInputRef.current?.focus();
  const handleSearchBarRightIconOnPress = () => setKeyword('');

  const safeData = useMemo(() => {
    if (shouldTriggerSearch && searchResults?.results?.length) {
      return searchResults.results;
    }
    return popularContentData?.results ?? [];
  }, [searchResults, popularContentData, shouldTriggerSearch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          ref={searchInputRef}
          value={keyword}
          onChangeText={setKeyword}
          onPress={handleSearchBarOnPress}
          showRightIcon
          showLeftIcon
          leftIconName="Search"
          rightIconName="ChevronLeft"
          placeholder="Search whatever you want"
          rightIconOnPress={handleSearchBarRightIconOnPress}
        />
        {isLoading && <ActivityIndicator />}
        <FlatList
          keyExtractor={(item, index) => `item-${item.id ?? index}`}
          data={safeData}
          ListEmptyComponent={<Text text="List Is Empty" />}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <MovieCardWithDescription
              item={item}
              onPress={() => navigation.navigate(MainNavigationpPages.MovieDetails, { movie: item })}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primary,
    padding: STATIC_PADDING,
    gap: 12,
  },
});
export default Search;
