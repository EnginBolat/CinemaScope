import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Popular } from '@models/Popular.ts';

export interface IFavoriteAndWatchLater extends Popular {
  type: 'tvShow' | 'movie';
}


type MainSliceType = {
  favorites: IFavoriteAndWatchLater[];
  watchLater: IFavoriteAndWatchLater[];
};

const initialState: MainSliceType = {
  favorites: [],
  watchLater: [],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setFavories: (state, action: PayloadAction<IFavoriteAndWatchLater[]>) => {
      state.favorites = action.payload;
    },
    setWatchLater: (state, action: PayloadAction<IFavoriteAndWatchLater[]>) => {
      state.watchLater = action.payload;
    },
  },
});

export const { setFavories, setWatchLater } = mainSlice.actions;
export default mainSlice.reducer;
