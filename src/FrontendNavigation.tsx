import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// import { Drawer } from 'react-native-paper';
//
import Profilepage from './components/FrontendComponents/BottomNavComponents/Profilepage';
import ReviewComment from './components/FrontendComponents/ProfileOrderComponents/ReviewComponents/components/ReviewCommentComponents/ReviewComment';
import CustomerHeader from './components/FrontendComponents/ReusableComponents/CustomHeader';
import { SCREEN_BACKGROUND_COLOR } from './constants';
import CheckoutGuest from './screens/Frontend/CheckoutGuest';
import CheckoutUser from './screens/Frontend/CheckoutUser';
import HomeScreen from './screens/Frontend/HomeScreen';
import LoginScreenFE from './screens/Frontend/LoginScreen';
import NoInternetConnection from './screens/Frontend/NoInternetConnection';
import OrderDetails from './screens/Frontend/OrderDetails';
import OrderList from './screens/Frontend/OrderList';
import ProfileOrder from './screens/Frontend/ProfileOrder';
import ProfileOrderForHamburgerScreen from './screens/Frontend/ProfileOrderForHamburger';
import UserAddressBook from './screens/Frontend/UserAddressBook';
import UserChangePassword from './screens/Frontend/UserChangePassword';
import UserNewAddressDetail from './screens/Frontend/UserNewAddressDetail';
import SplashScreen from './screens/Frontend/WelcomScreen';

export type ScreenParamsList = {
  Example: undefined;
  Splash: undefined;
  Login: undefined;
  NoInternet: undefined;
  Home: undefined;
  HomeScreen: undefined;
  ProfileOrder: undefined;
  CheckoutUser: undefined;
  CheckoutGuest: undefined;
  UserAddressBook: undefined;
  UserNewAddressDetail: undefined;
  UserChangePassword: undefined;
  OrderDetails: undefined;
  ProfilePage: undefined;
  UserReviews: undefined;
  OrdersList: undefined;
};

const RootNavigationStack = createNativeStackNavigator<ScreenParamsList>();

const Drawer = createDrawerNavigator();

export const FrontendNavigation = () => {
  const navigation = useNavigation<any>();
  return (
    <RootNavigationStack.Navigator initialRouteName="Splash">
      <RootNavigationStack.Screen
        name="Login"
        component={LoginScreenFE}
        options={{ headerShown: false }}
      />

      <RootNavigationStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <RootNavigationStack.Screen
        name="NoInternet"
        component={NoInternetConnection}
        options={{ headerShown: false }}
      />

      {/* <RootNavigationStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      /> */}

      <RootNavigationStack.Screen
        name="ProfileOrder"
        component={ProfileOrderForHamburgerScreen}
        options={{ headerShown: false }}
      />

      <RootNavigationStack.Screen
        name="ProfilePage"
        component={Profilepage}
        options={{ headerShown: false }}
      />

      <RootNavigationStack.Screen
        name="UserChangePassword"
        component={UserChangePassword}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="Change Password"
              navigation={() => navigation.navigate('HomeScreen')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="OrdersList"
        component={OrderList}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="My Orders"
              navigation={() => navigation.navigate('ProfileOrder')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="My Order Details"
              navigation={() => navigation.navigate('ProfileOrder')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="CheckoutGuest"
        component={CheckoutGuest}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="Complete your Order"
              navigation={() => navigation.navigate('HomeScreen')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="CheckoutUser"
        component={CheckoutUser}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="Complete your Order"
              navigation={() => navigation.navigate('HomeScreen')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="UserAddressBook"
        component={UserAddressBook}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="My Address Book"
              navigation={() => navigation.navigate('CheckoutUser')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="UserNewAddressDetail"
        component={UserNewAddressDetail}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="Add new address"
              navigation={() => navigation.navigate('UserAddressBook')}
            />
          ),
        }}
      />

      <RootNavigationStack.Screen
        name="UserReviews"
        component={ReviewComment}
        options={{
          headerStyle: {
            backgroundColor: SCREEN_BACKGROUND_COLOR,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerTitle: () => (
            <CustomerHeader
              moreclassName="mr-10"
              iconName="chevron-left"
              title="My reviews"
              navigation={() => navigation.navigate('HomeScreen')}
            />
          ),
        }}
      />

      {/* ReviewComment */}

      {/* <RootNavigationStack.Screen
        name="Example"
        component={ExampleScreen}
        options={({ navigation }) => {
          return {
            title: 'Eatonline',
            headerRight: (props) => {
              return (
                <TouchableOpacity
                  className="bg-transparent px-2 py-2"
                  onPress={async () => {
                    await configService.setConfig(configService.CONFIG_APP_MODE, 'TERMINAL');
                    navigation.replace('AppBootstrapScreen');
                  }}>
                  <Text className="text-gray-400">Terminal Mode</Text>
                </TouchableOpacity>
              );
            },
          };
        }}
      /> */}
      {/* <Text>Hello</Text> */}
    </RootNavigationStack.Navigator>
  );
};
