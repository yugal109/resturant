import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileData } from '../../api/Frontend/apiTypes/baseFrontEndApiType';

interface profileStateInterface {
  loading: boolean;
  profileData: ProfileData | null;
}

const initialState: profileStateInterface = {
  loading: false,
  profileData: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoadingStatus: (state) => {
      state.loading = true;
    },
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      state.loading = false;
      state.profileData = action.payload;
    },
  },
});
