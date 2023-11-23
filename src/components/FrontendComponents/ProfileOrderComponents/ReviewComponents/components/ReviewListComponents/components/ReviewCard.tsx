import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { PRIMARY_COLOR } from '../../../../../../../constants';
// import { actions, useAppDispatch } from '../../../../../../../store';

interface reviewCard {
  text: string;
  handleSnapPress: (index: number) => void;
}

const ReviewCard = ({ text, handleSnapPress }: reviewCard) => {
  return (
    <ScrollView className="flex-1">
      <View className=" items-center justify-center">
        <View className="bg-white rounded-xl w-11/12 my-7 px-4 py-3 space-y-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-primary text-2xl">{text}</Text>
            <Text className="text-gray-600 text-base">27 December 2021</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-2xl">Food</Text>
            <View className="flex-row">
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-black text-2xl">Delivery</Text>
            <View className="flex-row">
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
              <Entypo name="star" size={20} color={PRIMARY_COLOR} />
            </View>
          </View>

          <View>
            <Text className="text-base text-gray-500 truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua...
            </Text>
            <Text onPress={() => handleSnapPress(0)} className="m-3 text-primary">
              5 Replies
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReviewCard;
