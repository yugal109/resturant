import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
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

export default function HomeScreen({ navigation }: tProps) {
  const { snackBarVisible, snackBarText, snackBarBackgroundColor } = useAppSelector(
    (state) => state.home
  );
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
          name="Main"
          component={ProfileOrder}
          options={{
            headerShown: false,
          }}
        />

        {/* <Drawer.Screen name="Logout" /> */}
      </Drawer.Navigator>

      <Snackbar
        wrapperStyle={{ alignItems: 'center' }}
        style={{
          backgroundColor: snackBarBackgroundColor,
          borderRadius: 30,
          height: 70,
          width: 371,
          alignItems: 'center',
          paddingHorizontal: 15,
        }}
        visible={snackBarVisible}
        onDismiss={() =>
          actions.homeActions.setSnackBarVisibile({
            hideshow: false,
            text: '',
            color: '',
          })
        }
        action={{
          label: 'Cancel',
          textColor: 'white',
          onPress: () => {
            // Do something
            appDispatch(
              actions.homeActions.setSnackBarVisibile({
                hideshow: false,
                text: '',
                color: '',
              })
            );
          },
        }}>
        {snackBarText}
      </Snackbar>
    </>
  );
}
