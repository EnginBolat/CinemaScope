import { AppEndpoints } from '@constants/AppEndpoints';
import { api } from '@store/slice/request.ts';
import { RootPopular, MovieDetails, CastRoot, NowPlayingRoot } from '@models/index';

type SearchRequestParams = {
  query: string;
  page: number;
};

export const customRequest = api.injectEndpoints({
  endpoints: build => ({
    getSearchResults: build.query<RootPopular, SearchRequestParams>({
      query: ({ query, page }) => ({
        url: AppEndpoints.searchContent(encodeURIComponent(query), page).url,
        method: AppEndpoints.popular.method,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetSearchResultsQuery } = customRequest;
