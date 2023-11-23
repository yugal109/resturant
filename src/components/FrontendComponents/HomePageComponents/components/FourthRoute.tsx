import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LocationCardComponent from './components/LocationCardComponent';
import { menuWiseLocationApi } from '../../../../api/Frontend/menuWiseLocationApi';
import { MenuWiseLocationInterface } from '../../../../api/apiTypes';
import { actions, useAppDispatch, useAppSelector } from '../../../../store';
import { logError } from '../../../../utils/logger';

const FourthRoute = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const { fourthLocations, fourthScreenLoading } = useAppSelector((state) => state.home);
  useEffect(() => {
    appDispatch(actions.homeActions.fourthScreenDataLoadStart());
    menuWiseLocationApi(3)
      .then((response: MenuWiseLocationInterface[]) => {
        appDispatch(actions.homeActions.fetchFourthScreenData(response));
      })
      .catch((error) => {
        logError(error);
      });
  }, []);
  return (
    <ScrollView>
      {fourthScreenLoading ? (
        <View>
          <Text>Loadingggg....</Text>
        </View>
      ) : (
        <>
          {fourthLocations.map((location) => (
            <LocationCardComponent
              key={location.name}
              location={location}
              navigation={navigation}
            />
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default FourthRoute;
