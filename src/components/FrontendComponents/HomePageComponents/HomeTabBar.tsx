import React, { useEffect } from 'react';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// import ListSkeletor from './HomeListSkeleteonComponents';
import FirstRoute from './components/FirstRoutes';
import FourthRoute from './components/FourthRoute';
import SecondRoute from './components/SecondRoute';
import ThirdRoute from './components/ThirdRoute';
import { fetchMenuItemsApi } from '../../../api/Frontend/menuItemsApi';
import { PRIMARY_COLOR } from '../../../constants';
import { actions, useAppDispatch, useAppSelector } from '../../../store';
// import { logger } from '../../../utils';
import {
  logError,
  // logInfo, logSuccess
} from '../../../utils/logger';

// interface homeTabViewInterface {
//   key: string;
//   title: string;
// }

const initialLayout = { width: Dimensions.get('window').width };

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

const HomeTabView = () => {
  const { loading, index, routes } = useAppSelector((state) => state.home);
  const appDispatch = useAppDispatch();

  const renderScene = SceneMap({
    '0': FirstRoute,
    '1': SecondRoute,
    '2': ThirdRoute,
    '3': FourthRoute,
  });

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
  }, []);

  return (
    <View className="flex-1 bg-screenBackground">
      <StatusBar barStyle="light-content" />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {routes.length > 0 && (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={actions.homeActions.changeIndex}
              initialLayout={initialLayout}
              renderTabBar={renderTabBar}
            />
          )}
        </>
      )}
    </View>
  );
};

export default HomeTabView;
