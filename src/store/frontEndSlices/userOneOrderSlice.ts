import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserOneOrderInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { UserOrderDatum } from '../../api/Frontend/apiTypes/userOrderApiTypes';

type TuserOneOrderState = {
  loading: boolean;
  order: UserOrderDatum | null;
};

const initialState: TuserOneOrderState = {
  loading: false,
  order: null,
};

export const userOneOrderSlice = createSlice({
  name: 'userorders',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    setUserOneOrders: (state, action: PayloadAction<UserOneOrderInterface>) => {
      state.loading = false;
      state.order = action.payload.data;
    },
  },
});

export default userOneOrderSlice;
