import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profilUpdatedStateInterface {
  loading: boolean;
  editing: boolean;
  updated: string | null;
  error: string | null;
}

const initialState: profilUpdatedStateInterface = {
  loading: false,
  editing: false,
  updated: null,
  error: null,
};

export const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {
    setEditUpdate: (state, action: PayloadAction<boolean>) => {
      state.editing = action.payload;
    },
    startProfileEditLoading: (state) => {
      state.loading = true;
    },
    startProfileEditLoaded: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.updated = action.payload;
    },
    startProfileEditLoadError: (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
