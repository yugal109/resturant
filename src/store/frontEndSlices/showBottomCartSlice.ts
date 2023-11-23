import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface bottomCartSliceInterface {
  show: boolean;
  carts: any;
}

const initialState: bottomCartSliceInterface = {
  show: false,
  carts: [],
};

export const showBottomCartSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    setBottomCartShow: (state) => {
      state.show = true;
    },
    setBottomCartHide: (state) => {
      state.show = false;
    },
    setAddToCartFromBottomSheet: (state, action: PayloadAction<number>) => {
      const tempCarts: number[] = [];
      for (let i = 0; i < action.payload; i++) {
        tempCarts.push(i + 1);
      }
      state.carts = tempCarts;
    },

    // setFavouritesSuccess: (state, action: PayloadAction<MenuWiseLocationInterface[]>) => {
    //   state.loading = false;
    //   state.favs = action.payload;
    // },
    // setFavouritesError: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    // },
    // setRefreshingTrue: (state) => {
    //   state.refreshing = true;
    // },
    // setRefreshingFalse: (state) => {
    //   state.refreshing = false;
    // },
    // removeFavourite: (state, action: PayloadAction<string>) => {
    //   state.favs = state.favs.filter((fav) => fav.name !== action.payload);
    // },
  },
});
