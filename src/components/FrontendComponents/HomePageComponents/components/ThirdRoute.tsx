import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LocationCardComponent from './components/LocationCardComponent';
import { menuWiseLocationApi } from '../../../../api/Frontend/menuWiseLocationApi';
import { MenuWiseLocationInterface } from '../../../../api/apiTypes';
import { actions, useAppDispatch, useAppSelector } from '../../../../store';
import { logError } from '../../../../utils/logger';

const ThirdRoute = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const { thirdLocations, thirdScreenLoading } = useAppSelector((state) => state.home);
  useEffect(() => {
    appDispatch(actions.homeActions.thirdScreenDataLoadStart());
    menuWiseLocationApi(2)
      .then((response: MenuWiseLocationInterface[]) => {
        appDispatch(actions.homeActions.fetchThirdScreenData(response));
      })
      .catch((error) => {
        logError(error);
      });
  }, []);
  return (
    <ScrollView>
      {thirdScreenLoading ? (
        <View>
          <Text>Loadingggg....</Text>
        </View>
      ) : (
        <>
          {thirdLocations.map((location) => (
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

export default ThirdRoute;
