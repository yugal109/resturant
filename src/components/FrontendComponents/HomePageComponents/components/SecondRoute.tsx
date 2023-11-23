import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import LocationCardComponent from './components/LocationCardComponent';
import { menuWiseLocationApi } from '../../../../api/Frontend/menuWiseLocationApi';
import { MenuWiseLocationInterface } from '../../../../api/apiTypes';
import { actions, useAppDispatch, useAppSelector } from '../../../../store';
import { logError } from '../../../../utils/logger';

const SecondRoute = () => {
  const navigation = useNavigation();
  const appDispatch = useAppDispatch();
  const { secondLocations, secondScreenLoading } = useAppSelector((state) => state.home);
  useEffect(() => {
    appDispatch(actions.homeActions.secondScreenDataLoadStart());
    menuWiseLocationApi(1)
      .then((response: MenuWiseLocationInterface[]) => {
        appDispatch(actions.homeActions.fetchSecondScreenData(response));
      })
      .catch((error) => {
        logError(error);
      });
  }, []);

  return (
    <ScrollView className="flex-1">
      {secondScreenLoading ? (
        <View>
          <Text>Loadingggg....</Text>
        </View>
      ) : (
        <>
          {secondLocations.map((location) => (
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

export default SecondRoute;
