import React from 'react';
import { View } from 'react-native';

import AboutUs from './components/AboutUs';
import OpeningHours from './components/OpeningHours';

const InfoComponent = () => {
  return (
    <View className="pt-4">
      <AboutUs />
      <OpeningHours />
    </View>
  );
};

export default InfoComponent;
