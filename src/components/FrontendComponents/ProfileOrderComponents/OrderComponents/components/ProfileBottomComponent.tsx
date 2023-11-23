import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import ProfileBottomList from './components/ProfileBottomList';
import { restaurantPageMenuWiseItemsApi } from '../../../../../api/Frontend/profileOrderApi';
import { useAppSelector } from '../../../../../store';
import { logError } from '../../../../../utils/logger';

interface paramsType {
  handlePress: (index: number) => void;
  index: number;
  popular?: boolean;
  screenName?: string;
}

const ProfileBottomComponent = ({ handlePress, popular, index, screenName }: paramsType) => {
  const { locationLoading, locations } = useAppSelector((state) => state.profileOrderOrder);
  // const appDispatch = useAppDispatch();
  const [locationsLocal, setLocationsLocal] = useState<any>([]);
  const [locationLoadingLocal, setLocationLoadingLocal] = useState<boolean>(false);

  useEffect(() => {
    if (popular === true) {
      // appDispatch(actions.profileOrderOrderActions.setLocationLoading());
    } else {
      setLocationLoadingLocal(true);
      restaurantPageMenuWiseItemsApi(index)
        .then((response: any) => {
          // console.log(response.data);
          // appDispatch(actions.profileOrderOrderActions.setLocations(response));
          setLocationLoadingLocal(false);
          // setLocationsLocal(response);
          setLocationsLocal([{ id: 1, name: 'helo' }]);
        })
        .catch((error) => {
          logError(error);
          setLocationLoadingLocal(false);
        });
    }
  }, []);

  return (
    <>
      {popular === true ? (
        <ScrollView className="w-full pt-4 px-6 bg-screenBackground">
          <Text className="text-2xl font-medium mb-6">{screenName}</Text>
          {locationLoading ? (
            <ActivityIndicator size="small" />
          ) : (
            <>
              {locations.map((loc: any) => (
                <ProfileBottomList key={loc.id} handlePress={handlePress} location={loc} />
              ))}
            </>
          )}
        </ScrollView>
      ) : (
        <ScrollView className="w-full pt-4 px-6 bg-screenBackground">
          <Text className="text-2xl font-medium mb-6">{screenName}</Text>
          {locationLoadingLocal ? (
            <ActivityIndicator size="small" />
          ) : (
            <>
              {locationsLocal.map((loc: any) => (
                <ProfileBottomList key={loc.id} handlePress={handlePress} location={loc} />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default ProfileBottomComponent;
