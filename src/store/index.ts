import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authSlice from './frontEndSlices/authSlice';
import { favouriteSlice } from './frontEndSlices/favouriteSlice';
import { homeSlice } from './frontEndSlices/homeSlice';
import { profileEditSlice } from './frontEndSlices/profileEditSlice';
import { profileOrderOrderSlice } from './frontEndSlices/profileOrderOrderSlice';
import profileOrderSlice from './frontEndSlices/profileOrderSlice';
import { profileSlice } from './frontEndSlices/profileSlice';
import { reviewsSlice } from './frontEndSlices/reviewsSlice';
import { showBottomCartSlice } from './frontEndSlices/showBottomCartSlice';
import userOneOrderSlice from './frontEndSlices/userOneOrderSlice';
import userOrderSlice from './frontEndSlices/userOrderSlice';
import ordersSlice from './ordersSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
    profileOrders: profileOrderSlice.reducer,
    userOrders: userOrderSlice.reducer,
    userOneOrder: userOneOrderSlice.reducer,
    profileOrderOrder: profileOrderOrderSlice.reducer,
    home: homeSlice.reducer,
    favourites: favouriteSlice.reducer,
    profile: profileSlice.reducer,
    review: reviewsSlice.reducer,
    profileEdit: profileEditSlice.reducer,
    cartItems: showBottomCartSlice.reducer,
  },
});

const actions = {
  authActions: authSlice.actions,
  ordersActions: ordersSlice.actions,
  profileOrderActions: profileOrderSlice.actions,
  userOrderActions: userOrderSlice.actions,
  userOneOrderActions: userOneOrderSlice.actions,
  profileOrderOrderActions: profileOrderOrderSlice.actions,
  homeActions: homeSlice.actions,
  favouriteActions: favouriteSlice.actions,
  profileActions: profileSlice.actions,
  reviewActions: reviewsSlice.actions,
  profileEditActions: profileEditSlice.actions,
  cartActions: showBottomCartSlice.actions,
};

export default store;
export { actions };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Actions = typeof actions;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
