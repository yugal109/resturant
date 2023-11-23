import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const OverallReview = () => {
  return (
    <View className="bg-primary h-32 mx-4 mb-4 rounded-xl justify-center pl-8">
      <Text className="text-white text-2xl">Overall Score</Text>
      <View className="flex-row items-center space-x-2">
        <Text className="text-4xl text-white font-bold">4.0</Text>
        <View className="flex-row">
          <Entypo name="star" size={20} color="white" />
          <Entypo name="star" size={20} color="white" />
          <Entypo name="star" size={20} color="white" />
          <Entypo name="star" size={20} color="white" />
          <Entypo name="star" size={20} color="gray" />
        </View>
        <Text className=" text-lg text-white">225 reviews</Text>
      </View>
    </View>
  );
};

export default OverallReview;
