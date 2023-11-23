import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ProfileBottomComponent from './components/ProfileBottomComponent';
import { PRIMARY_COLOR } from '../../../../constants';
import { useAppSelector } from '../../../../store';

const Tab = createMaterialTopTabNavigator();

interface abc {
  handlePress: any;
}

const TabViewOrderComponent = ({ handlePress }: abc) => {
  const { menus } = useAppSelector((state) => state.profileOrderOrder);
  const [showHide, setShowHide] = useState<boolean>(false);
  const handleShow = () => {
    setShowHide(true);
  };
  return (
    <View className="h-full pb-72">
      {menus.length !== 0 && (
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarItemStyle: {
              width: 'auto',
            },
            tabBarStyle: {
              height: 70,
              alignSelf: 'center',
              flexDirection: 'row',
            },
            tabBarIndicatorStyle: {
              backgroundColor: PRIMARY_COLOR,
              height: 3,
              marginBottom: 12,
            },
          }}>
          <Tab.Screen
            name="Popular dishes"
            children={() => (
              <ProfileBottomComponent
                popular
                index={0}
                key={0}
                handlePress={handlePress}
                screenName="Popular dishes"
              />
            )}
          />

          {menus.map((menu) => (
            <Tab.Screen
              key={menu.id}
              name={`${menu.attributes.menu_name} ${menu.attributes.menu_id}`}
              children={() => (
                <ProfileBottomComponent
                  index={parseInt(menu.id, 10)}
                  key={menu.id}
                  handlePress={handlePress}
                  screenName={`${menu.attributes.menu_name}`}
                />
              )}
            />
          ))}
        </Tab.Navigator>
      )}
    </View>
  );
};

export default TabViewOrderComponent;
