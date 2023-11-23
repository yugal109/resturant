import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ResturantProfilePageTopInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { Attributes } from '../../api/Frontend/apiTypes/homePageApiTypes';

type TprofileOrderState = {
  loading: boolean;
  index: number;
  reviewTabOpenClose: boolean;
  selfSheet: React.RefObject<BottomSheetMethods> | null;
  //top part data
  name: string;
  following: boolean | null;
  totalFollowers: number;
  min: number;
  discount: number;
  //top part data
  hideShowBottom: boolean;
};

const initialState: TprofileOrderState = {
  loading: false,
  index: 0,
  reviewTabOpenClose: false,
  selfSheet: null,
  following: null,
  name: '',
  totalFollowers: 0,
  min: 10,
  discount: 10,
  hideShowBottom: false,
};

export const profileOrderSlice = createSlice({
  name: 'profileorders',
  initialState,
  reducers: {
    changeIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    openTab: (state) => {
      state.reviewTabOpenClose = true;
      state.selfSheet?.current?.snapToIndex(0);
    },
    closeTab: (state) => {
      state.reviewTabOpenClose = false;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    setTopHalfData: (state, action: PayloadAction<ResturantProfilePageTopInterface>) => {
      state.name = action.payload.data.attributes.location_name;
      // state.following = action.payload.following;
      // state.discount = action.payload.discount;
      // state.min = action.payload.min;
      // state.totalFollowers = action.payload.totalFollowers;
      state.loading = false;
    },
  },
});

export default profileOrderSlice;
