import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TAuthState = {
  isLoggedIn?: boolean;
  activeLocation?: App.Api.Location;
  locations?: App.Api.Pagination<App.Api.Location>;
};

const initialState: TAuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setActiveLocation: (state, action?: PayloadAction<App.Api.Location>) => {
      state.activeLocation = action?.payload;
    },
    setLocations: (state, action: PayloadAction<TAuthState['locations']>) => {
      state.locations = action.payload;
    },
  },
});

export default authSlice;
