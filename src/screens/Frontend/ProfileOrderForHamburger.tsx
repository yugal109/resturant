import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Snackbar } from 'react-native-paper';

import BottomNavigator from './BottomNavigator';
import ProfileOrder from './ProfileOrder';
import CustomDrawerContent from './utils/CutomDrawerComponent';
import { PRIMARY_COLOR } from '../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../store';

const Drawer = createDrawerNavigator();

interface tProps {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}

export default function ProfileOrderForHamburgerScreen({ navigation }: tProps) {
  const appDispatch = useAppDispatch();
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          drawerStyle: {
            borderTopRightRadius: 40,
            borderBottomRightRadius: 40,
            backgroundColor: PRIMARY_COLOR,
          },
        }}>
        <Drawer.Screen
          name="ProfileOrderCustom"
          component={ProfileOrder}
          options={{
            headerShown: false,
          }}
        />

        {/* <Drawer.Screen name="Logout" /> */}
      </Drawer.Navigator>
    </>
  );
}
