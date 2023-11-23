import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RestaurantProfileMenuInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { MenuDatum } from '../../api/Frontend/apiTypes/homePageApiTypes';

interface tryLocation {
  title: string;
  id: number;
}

interface tryLocation {
  name: string;
  description: string;
  rate: number;
  following: boolean;
}

type intitalStateInterface = {
  loading: boolean;
  locationLoading: boolean;
  menus: MenuDatum[];
  index: number;
  locations: tryLocation[];
  itemForOrder: number;
};

const initialState: intitalStateInterface = {
  loading: false,
  locationLoading: false,
  menus: [],
  index: 0,
  locations: [],
  itemForOrder: 0,
};

export const profileOrderOrderSlice = createSlice({
  name: 'profileorderorder',
  initialState,
  reducers: {
    setLoading: (state) => {
      if (state.menus.length === 0) {
        state.loading = true;
      }
    },
    setMenus: (state, action: PayloadAction<RestaurantProfileMenuInterface>) => {
      state.menus = action.payload.data;
      state.loading = false;
    },
    setMenusEmpty: (state) => {
      state.menus = [];
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    setLocationLoading: (state) => {
      state.locationLoading = true;
    },
    setLocations: (state, action: PayloadAction<tryLocation[]>) => {
      state.locationLoading = false;
      state.locations = action.payload;
    },
    itemForOrderIncrease: (state) => {
      state.itemForOrder = state.itemForOrder + 1;
    },
    itemForOrderDecrease: (state) => {
      if (state.itemForOrder === 0) {
      } else {
        state.itemForOrder = state.itemForOrder - 1;
      }
    },
  },
});
