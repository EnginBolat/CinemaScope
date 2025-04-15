import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MainSliceType = {
    favorites: string[]; // ID Değerlerini tutar
}

const initialState: MainSliceType = {
    favorites: []
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setFavories: (state, action: PayloadAction<string[]>) => {
            state.favorites = action.payload
        }
    }
})

export const { setFavories } = mainSlice.actions
export default mainSlice.reducer;
