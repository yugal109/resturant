import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ResturantProfilePageTopInterface,
  UserOrderInterface,
} from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { Attributes } from '../../api/Frontend/apiTypes/homePageApiTypes';
import { UserOrderDatum } from '../../api/Frontend/apiTypes/userOrderApiTypes';

type TuserOrderState = {
  loading: boolean;
  orders: UserOrderDatum[];
};

const initialState: TuserOrderState = {
  loading: false,
  orders: [],
};

export const userOrderSlice = createSlice({
  name: 'userorders',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setUserOrders: (state, action: PayloadAction<UserOrderInterface>) => {
      state.loading = false;
      state.orders = action.payload.data;
    },
    setEmptyUserOrders: (state) => {
      state.loading = false;
      state.orders = [];
    },
  },
});

export default userOrderSlice;
