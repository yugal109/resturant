import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { ScreenParamsList } from '../Navigation';
import { locationsApi } from '../api';
import configService from '../services/configService';
import loginService from '../services/loginService';
import { actions, useAppDispatch } from '../store';

type TProps = NativeStackScreenProps<ScreenParamsList, 'AppBootstrapScreen'>;
export const AppBootstrapScreen = ({ navigation }: TProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const caller = async () => {
      const isLoggedIn = await loginService.isLoggedIn();
      const activeLocationId = await loginService.getActiveLocationId();
      const appMode = await configService.getConfig(configService.CONFIG_APP_MODE, 'FRONTEND');
      if (appMode === 'FRONTEND') {
        navigation.replace('Frontend');
        return;
      }
      const locations = isLoggedIn
        ? await locationsApi.getLocations().catch(() => undefined)
        : undefined;

      if (locations?.data.length) {
        dispatch(actions.authActions.setLocations(locations));

        if (activeLocationId) {
          const activeLocation = locations.data.find((i) => i.id === activeLocationId);
          if (activeLocation) {
            dispatch(actions.authActions.setActiveLocation(activeLocation));

            navigation.replace('Home', {
              screen: 'App',
              params: { screen: 'OrdersListScreen' },
            } as any);
            return;
          }
        }

        // navigate to location selection
        navigation.replace('LocationSelectScreen');
      } else {
        // navigate to login screen: eiter isLoggedIn is false or there are no active locations
        // need to check error type whether it is network error or http error
        navigation.replace('LoginScreen');
      }
    };
    caller();
  }, []);

  return (
    <View className="flex-1 pb-8 justify-center items-center bg-blue-600">
      <ActivityIndicator color="white" size="large" />
    </View>
  );
};
