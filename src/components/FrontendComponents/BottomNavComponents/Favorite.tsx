import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';

import FavouriteCardComponent from './components/ProfilePageComponents/FavouriteComponents/FavouriteCard';
import { favouritesApi, favouritesApiReloaded } from '../../../api/Frontend/favouritesApi';
import { PRIMARY_COLOR } from '../../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../../store';
// import { favsInterface } from '../../../store/frontEndSlices/favouriteSlice';
import { logError } from '../../../utils/logger';
import ListSkeletor from '../HomePageComponents/HomeListSkeleteonComponents';
// import LocationCardComponent from '../HomePageComponents/components/components/LocationCardComponent';

const Favorite = () => {
  const navigation = useNavigation();
  const { loading, favs, refreshing } = useAppSelector((state) => state.favourites);
  const appDispatch = useAppDispatch();

  const onRefresh = useCallback(() => {
    appDispatch(actions.favouriteActions.setRefreshingTrue());
    favouritesApiReloaded()
      .then((response: any) => {
        appDispatch(actions.favouriteActions.setFavouritesSuccess(response));
        appDispatch(actions.favouriteActions.setRefreshingFalse());
      })
      .catch((error: any) => {
        logError(error);
      });
  }, []);

  useEffect(() => {
    appDispatch(actions.favouriteActions.startFetchingFavourites());
    favouritesApi()
      .then((response: any) => {
        appDispatch(actions.favouriteActions.setFavouritesSuccess(response));
      })
      .catch((error: any) => {
        logError(error);
      });
  }, []);

  return (
    <View className="flex-1 bg-screenBackground">
      {loading ? (
        <>
          <ListSkeletor />
          <ListSkeletor />
          <ListSkeletor />
          <ListSkeletor />
        </>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              // colors={['#6DBD64']}
              tintColor={PRIMARY_COLOR}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}>
          {favs.map((fav) => (
            <FavouriteCardComponent key={fav.name} location={fav} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Favorite;
