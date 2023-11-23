import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import Favorite from '../../components/FrontendComponents/BottomNavComponents/Favorite';
import Home from '../../components/FrontendComponents/BottomNavComponents/Home';
import Locations from '../../components/FrontendComponents/BottomNavComponents/Locations';
import Profilepage from '../../components/FrontendComponents/BottomNavComponents/Profilepage';
import CustomerHeader from '../../components/FrontendComponents/ReusableComponents/CustomHeader';
import { PRIMARY_COLOR, SCREEN_BACKGROUND_COLOR, SECONDARY_COLOR } from '../../constants';

const Tab = createBottomTabNavigator();

type IconName = 'home' | 'heart' | 'account' | 'map-marker';

const screenConfigs = [
  { name: 'Kwikstraat 8, Everberg', component: Home, iconName: 'home' },
  { name: 'Following', component: Favorite, iconName: 'heart' },
  { name: 'Profilepage', component: Profilepage, iconName: 'account' },
  { name: 'Locations', component: Locations, iconName: 'map-marker' },
];

const BottomNavigator = () => {
  const navigation = useNavigation<any>();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: SCREEN_BACKGROUND_COLOR,
          borderTopColor: SCREEN_BACKGROUND_COLOR,
        },
        tabBarIcon: ({ focused, color, size }) => {
          // '#ADADAF';
          const activeColor = focused ? PRIMARY_COLOR : SECONDARY_COLOR;
          const iconSize = 30;

          const screenConfig = screenConfigs.find((config) => config.name === route.name);

          if (screenConfig) {
            const iconToShow = focused ? screenConfig.iconName : `${screenConfig.iconName}-outline`;

            return (
              <MaterialCommunityIcons
                name={iconToShow as IconName}
                size={iconSize}
                color={activeColor}
              />
            );
          }

          return null;
        },
      })}>
      {screenConfigs.map((screenConfig) => (
        <Tab.Screen
          key={screenConfig.name}
          name={screenConfig.name}
          component={screenConfig.component}
          options={{
            headerStyle: {
              backgroundColor: SCREEN_BACKGROUND_COLOR,
              shadowColor: SCREEN_BACKGROUND_COLOR,
            },
            headerTitle: () => (
              <CustomerHeader
                title={screenConfig.name}
                iconName="menu"
                navigation={() => navigation.openDrawer()}
              />
            ),
            tabBarLabel: '',
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
