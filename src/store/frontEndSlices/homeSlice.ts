import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Location, MenuWiseLocationInterface } from '../../api/apiTypes';
import { logSuccess } from '../../utils/logger';

interface homeTabViewInterface {
  key: string;
  title: string;
}

interface homeInitialInterface {
  loading: boolean;
  error: string | null;
  snackBarVisible: boolean;
  snackBarText: string;
  snackBarBackgroundColor: string;
  menuItems: App.Api.Menu[];
  index: number;
  routes: homeTabViewInterface[];
  allLocations: Location[];
  firstScreenLoading: boolean;
  secondScreenLoading: boolean;
  secondLocations: MenuWiseLocationInterface[];
  thirdScreenLoading: boolean;
  thirdLocations: MenuWiseLocationInterface[];
  fourthScreenLoading: boolean;
  fourthLocations: MenuWiseLocationInterface[];
}

const initialState: homeInitialInterface = {
  loading: false,
  error: null,
  menuItems: [],
  snackBarVisible: false,
  snackBarText: '',
  snackBarBackgroundColor: '',
  index: 0,
  routes: [],
  allLocations: [],
  firstScreenLoading: false,
  secondScreenLoading: false,
  secondLocations: [],
  thirdScreenLoading: false,
  thirdLocations: [],
  fourthScreenLoading: false,
  fourthLocations: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    startFetchingMenu: (state) => {
      state.loading = true;
    },
    menuFetchSuccess: (state, action: PayloadAction<App.Api.Menu[]>) => {
      const abc: homeTabViewInterface[] = [];
      state.menuItems = action.payload;
      abc.push({
        key: '0',
        title: 'All',
      });
      for (let i = 0; i < action.payload.slice(0, 3).length; i++) {
        abc.push({
          key: (i + 1).toString(),
          title: action.payload[i].attributes.menu_name,
        });
      }
      // logSuccess(abc);
      state.routes = abc;
      state.loading = false;
    },
    setAllLocations: (state, action: PayloadAction<App.Api.Location[]>) => {
      // logSuccess(action.payload);
      state.allLocations = action.payload;
    },
    changeIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    secondScreenDataLoadStart: (state) => {
      state.secondScreenLoading = true;
    },
    fetchSecondScreenData: (state, action: PayloadAction<App.Api.MenuWiseLocationInterface[]>) => {
      state.secondScreenLoading = false;
      state.secondLocations = action.payload;
    },
    thirdScreenDataLoadStart: (state) => {
      state.thirdScreenLoading = true;
    },
    fetchThirdScreenData: (state, action: PayloadAction<App.Api.MenuWiseLocationInterface[]>) => {
      state.thirdScreenLoading = false;
      state.thirdLocations = action.payload;
    },
    fourthScreenDataLoadStart: (state) => {
      state.fourthScreenLoading = true;
    },
    fetchFourthScreenData: (state, action: PayloadAction<App.Api.MenuWiseLocationInterface[]>) => {
      state.fourthScreenLoading = false;
      state.fourthLocations = action.payload;
    },
    setSnackBarVisibile: (
      state,
      action: PayloadAction<{ hideshow: boolean; text: string; color: string }>
    ) => {
      state.snackBarVisible = action.payload.hideshow;
      state.snackBarText = action.payload.text;
      state.snackBarBackgroundColor = action.payload.color;
    },
  },
});
