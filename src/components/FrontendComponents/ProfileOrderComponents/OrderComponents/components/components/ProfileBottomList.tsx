import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-animatable';

interface paramsType {
  handlePress: (index: number) => void;
  location: any;
}

const ProfileBottomList = ({ handlePress, location }: paramsType) => {
  return (
    <TouchableOpacity className="flex-row bg-white mb-3 rounded-2xl ">
      {/* Image */}
      <View>
        <Image source={require('../../../../../../../assets/food.png')} />
      </View>
      {/* Item content */}
      <View className="flex-1 mx-4 my-2">
        <Text className="text-2xl font-medium">{location.name}</Text>
        <View className="flex-row items-center">
          <Text className="text-lg mt-1 flex-1">
            Lorem ipsum dolor sit amet, sectetur adipiscing elit,.
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-full w-10 items-center justify-center"
            onPress={() => handlePress(0)}>
            <Text className=" text-4xl font-medium">+</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-2xl font-medium text-secondary mt-2">$15.50</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBottomList;
