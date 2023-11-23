import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuWiseLocationInterface } from './../../api/apiTypes';

export interface favsInterface {
  title: string;
  available_items: string;
  rate: string;
}

interface favouriteSliceInterface {
  loading: boolean;
  refreshing: boolean;
  favs: MenuWiseLocationInterface[];
  error: string | null;
}

const initialState: favouriteSliceInterface = {
  loading: false,
  refreshing: false,
  favs: [],
  error: null,
};

export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    startFetchingFavourites: (state) => {
      state.loading = true;
    },
    setFavouritesSuccess: (state, action: PayloadAction<MenuWiseLocationInterface[]>) => {
      state.loading = false;
      state.favs = action.payload;
    },
    setFavouritesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setRefreshingTrue: (state) => {
      state.refreshing = true;
    },
    setRefreshingFalse: (state) => {
      state.refreshing = false;
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favs = state.favs.filter((fav) => fav.name !== action.payload);
    },
  },
});
