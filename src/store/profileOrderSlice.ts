import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TprofileOrderState {
  index: number;
}

const profileOrderState: TprofileOrderState = {
  index: 0,
};

export const profileOrderSlice = createSlice({
  name: 'profileorders',
  profileOrderState,
  reducers: {},
});

export default profileOrderSlice;
