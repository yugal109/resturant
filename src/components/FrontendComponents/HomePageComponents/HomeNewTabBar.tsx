import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import ListSkeletor from './HomeListSkeleteonComponents';
import FirstRoute from './components/FirstRoutes';
import FourthRoute from './components/FourthRoute';
import SecondRoute from './components/SecondRoute';
import ThirdRoute from './components/ThirdRoute';
import { fetchMenuItemsApi } from '../../../api/Frontend/menuItemsApi';
import { PRIMARY_COLOR } from '../../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../../store';
import { logger } from '../../../utils';
import { logError, logInfo, logSuccess } from '../../../utils/logger';

interface homeTabViewInterface {
  key: string;
  title: string;
}

const initialLayout = { width: Dimensions.get('window').width };

const Tab = createMaterialTopTabNavigator();

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    scrollEnabled
    tabStyle={{ width: 'auto', marginLeft: 10 }}
    indicatorStyle={{
      backgroundColor: PRIMARY_COLOR,
      marginBottom: 15,
      height: 3,
      marginLeft: 6,
    }}
    className="py-3 bg-white"
    renderLabel={({ route, focused }) => (
      <Text className={` text-sm ${focused ? ' text-primary' : 'text-grey'}`}>{route.title}</Text>
    )}
  />
);

const HomeNewTabView = () => {
  const { loading, index, routes } = useAppSelector((state) => state.home);
  const appDispatch = useAppDispatch();

  const newRenderScreeen = SceneMap({
    '0': FirstRoute,
    '1': SecondRoute,
    '2': ThirdRoute,
    '3': FourthRoute,
  });

  const [renderScene, setRenderScene] = useState<any>(
    null
    // SceneMap({
    //   '0': FirstRoute,
    //   '1': SecondRoute,
    //   '2': ThirdRoute,
    //   '3': FourthRoute,
    // })
  );

  useEffect(() => {
    appDispatch(actions.homeActions.startFetchingMenu());
    fetchMenuItemsApi()
      .then((response) => {
        appDispatch(actions.homeActions.menuFetchSuccess(response.menu_response.data));
        appDispatch(actions.homeActions.setAllLocations(response.location_response.data));
      })
      .catch((error) => {
        logError(error);
      });
    // setRenderScene(
    //   SceneMap({
    //     '0': FirstRoute,
    //     '1': SecondRoute,
    //     '2': ThirdRoute,
    //     '3': FourthRoute,
    //   })
    // );
  }, []);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {routes.length > 0 && (
            <View className="h-full pb-72">
              {routes.length !== 0 && (
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
                    name="popular dishes"
                    children={() => (
                      <Text>
                        <h1>Hello</h1>
                      </Text>

                      // <ProfileBottomComponent popular index={0} key={0} handlePress={handlePress} />
                    )}
                  />

                  {routes.map((rot) => (
                    <Tab.Screen
                      name={`${rot.title}`}
                      children={() => (
                        <Text>
                          <h1>{rot.title}</h1>
                        </Text>
                        // <ProfileBottomComponent
                        //   index={loc.id}
                        //   key={loc.id}
                        //   handlePress={handlePress}
                        // />
                      )}
                    />
                  ))}
                </Tab.Navigator>
              )}
            </View>
            // <TabView
            //   navigationState={{ index, routes }}
            //   renderScene={newRenderScreeen}
            //   onIndexChange={actions.homeActions.changeIndex}
            //   initialLayout={initialLayout}
            //   renderTabBar={renderTabBar}
            // />
          )}
        </>
      )}
    </View>
  );
};

export default HomeNewTabView;
