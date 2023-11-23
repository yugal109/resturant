import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

const AboutUs = () => {
  return (
    <View>
      <View className="flex-row items-center">
        <Entypo name="home" size={24} color="black" />
        <Text className=" text-xl">About Us</Text>
      </View>
      <View className=" mt-9">
        <Text className=" text-lg">
          Lorem ipsum dolor sit amet, sectetur adipiscing elit,.Dui ut ornare lectus sit amet.
          Varius sit amet mattis vulputate enim nulla. Read more
        </Text>
      </View>
    </View>
  );
};

export default AboutUs;
