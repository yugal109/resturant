import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface reivewsListStateInterface {
  loading: boolean;
  mostRelevantReviews: any;
  newestReviews: any;
  highestReviews: any;
  lowestReviews: any;
}

const initialState: reivewsListStateInterface = {
  loading: false,
  mostRelevantReviews: [],
  newestReviews: [],
  highestReviews: [],
  lowestReviews: [],
};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    startReviewsFetch: (state) => {
      state.loading = true;
    },
    successMostRelevantReviews: (state, action: PayloadAction<any>) => {
      state.loading = false;
    },
  },
});
