import React from 'react';
import { View, Text } from 'react-native';

const OfferComponent = () => {
  return (
    <View className="flex-1 justify-start items-center w-full pl-3 pr-3">
      <View className="w-full border-2 p-5 rounded-xl border-dashed border-primary">
        <View className="items-center p-3 bg-white">
          <Text className="text-2xl"> Enkel afhalen, € 7 small pizza</Text>
          <Text className=" text-base text-center mt-3 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua..
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OfferComponent;
