import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR } from '../../../../../../constants';

interface ListCardProps {
  name: string;
  icon?: string | undefined;
  navigation(): void;
}

const ListCard = ({ name, navigation }: ListCardProps) => {
  return (
    <TouchableOpacity
      className=" mb-8 bg-white flex-row items-center p-3 border border-white shadow-black/10 rounded-2xl"
      onPress={navigation}>
      <View className=" flex-1 flex-col">
        <Text className=" text-lg mb-1">{name}</Text>
      </View>
      <View className=" mb-2">
        <Entypo name="chevron-right" size={24} color={PRIMARY_COLOR} />
      </View>
    </TouchableOpacity>
  );
};

export default ListCard;
