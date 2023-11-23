import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerScreenProps } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';

import { FrontendNavigation } from './FrontendNavigation';
import { HomeDrawerContent } from './components/HomeDrawerContent';
import { OrdersWatcher } from './components/OrdersWatcher';
import { PRIMARY_COLOR } from './config';
import { AppBootstrapScreen } from './screens/AppBootstrapScreen';
import { LocationSelectScreen } from './screens/LocationSelectScreen';
import { LoginScreen } from './screens/LoginScreen';
import { OrderDetailScreen } from './screens/OrderDetailScreen';
import { OrdersListScreen } from './screens/OrdersListScreen';
import { SalesReportScreen } from './screens/SalesReportScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export type ScreenParamsList = {
  AppBootstrapScreen: undefined;
  Home: undefined;
  OrdersListScreen?: { selectedDate?: number };
  LoginScreen: undefined;
  OrderDetailScreen: { orderId: string };
  LocationSelectScreen: undefined;
  SettingsScreen: undefined;
  SalesReportScreen: undefined;
  Frontend: undefined;
};

type DrawerScreenParamsList = {
  App: { isLoggedIn: boolean };
};

const RootNavigationStack = createNativeStackNavigator<ScreenParamsList>();
const HomeStack = createNativeStackNavigator<ScreenParamsList>();
const Drawer = createDrawerNavigator<DrawerScreenParamsList>();

const HeaderBackground = () => <View style={{ backgroundColor: PRIMARY_COLOR, flex: 1 }} />;

const styles = StyleSheet.create({
  headerStyles: { fontSize: 22, fontFamily: 'Poppins-SemiBold' },
});

const headerTintStyles = [sanFranciscoWeights.semibold, styles.headerStyles] as any;

const DrawerWithScreens = ({ navigation }: DrawerScreenProps<DrawerScreenParamsList, 'App'>) => {
  return (
    <OrdersWatcher>
      <HomeStack.Navigator
        screenOptions={{
          headerTitleStyle: headerTintStyles,
          headerTintColor: '#fff',
          headerBackground: HeaderBackground,
        }}>
        <HomeStack.Screen
          name="OrdersListScreen"
          options={{
            title: 'Eatonline',
            headerBackTitle: 'Orders',
            headerLeft: () => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.openDrawer();
                  }}>
                  <Ionicons name="ios-menu" color="white" size={32} />
                </TouchableOpacity>
              );
            },
          }}
          component={OrdersListScreen}
        />
        <HomeStack.Screen
          name="OrderDetailScreen"
          options={{ title: 'Order Detail' }}
          component={OrderDetailScreen}
        />
        <HomeStack.Screen
          name="SettingsScreen"
          options={{ title: 'Settings' }}
          component={SettingsScreen}
        />
        <HomeStack.Screen
          name="SalesReportScreen"
          options={{ title: 'Sales Report' }}
          component={SalesReportScreen}
        />
      </HomeStack.Navigator>
    </OrdersWatcher>
  );
};

const HomeWithDrawerNavigation = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <HomeDrawerContent {...props} />}>
      <Drawer.Screen
        name="App"
        component={DrawerWithScreens}
        options={{ drawerType: 'front', swipeEnabled: true, headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default () => {
  return (
    <RootNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootNavigationStack.Screen
        name="AppBootstrapScreen"
        options={{ headerShown: false, headerBackground: undefined, animation: 'none' }}
        component={AppBootstrapScreen}
      />
      <RootNavigationStack.Screen
        name="Frontend"
        options={{ headerShown: false, headerBackground: undefined, animation: 'none' }}
        component={FrontendNavigation}
      />
      <HomeStack.Screen
        name="LocationSelectScreen"
        options={{
          headerShown: true,
          title: 'Location',
          headerTitleStyle: headerTintStyles,
          headerTintColor: '#fff',
          headerBackground: HeaderBackground,
        }}
        component={LocationSelectScreen}
      />
      <RootNavigationStack.Screen
        name="LoginScreen"
        options={{
          headerShown: true,
          title: 'Eatonline Dashboard',
          headerTitleStyle: headerTintStyles,
          headerTintColor: '#fff',
          headerBackground: HeaderBackground,
        }}
        component={LoginScreen}
      />
      <RootNavigationStack.Screen name="Home" component={HomeWithDrawerNavigation} />
    </RootNavigationStack.Navigator>
  );
};
