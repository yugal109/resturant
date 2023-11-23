import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FollowingCard = () => {
  const navigation = useNavigation<any>();
  return (
    <View className="items-center">
      <View className="flex-row mb-5 ">
        <TouchableOpacity
          className=" w-40 h-32 bg-white mx-3 rounded-2xl items-center justify-center shadow-md "
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text className="font-bold text-primary text-4xl">15</Text>
          <Text className="text-secondary font-bold text-2xl">Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" w-40 h-32 bg-white mx-3 rounded-2xl items-center justify-center shadow-md "
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text className="font-bold text-primary text-4xl">15.5k</Text>
          <Text className="text-secondary font-bold text-2xl">Points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowingCard;
