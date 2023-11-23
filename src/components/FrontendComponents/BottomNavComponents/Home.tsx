import React from 'react';
import { View } from 'react-native';

import HomeSearchBar from '../HomePageComponents/HomeSearchBar';
import HomeTabView from '../HomePageComponents/HomeTabBar';

const Home = () => {
  return (
    <View className=" flex-1 bg-screenBackground ">
      <HomeSearchBar />
      <HomeTabView />
    </View>
  );
};

export default Home;
