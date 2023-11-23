import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import { PRIMARY_COLOR } from '../../../constants';
import { useAppSelector } from '../../../store';

const ProfileTopComponent = () => {
  const navigation = useNavigation<any>();
  const { name } = useAppSelector((state) => state.profileOrders);
  return (
    <SafeAreaView>
      <View className="flex-row mx-9 space-x-40 mt-8 items-center ">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          {/* <TouchableOpacity onPress={() => null}> */}
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-xl">{name}</Text>
      </View>
      <View className="w-full flex-row justify-center items-center px-5 pb-5 ">
        <View className="bg-primary items-center w-1/4 rounded-full mt-6">
          <View className="justify-center items-center h-24 ">
            <Text>Left</Text>
          </View>
        </View>
        <View className="items-center w-3/4">
          <View className="flex-row items-center justify-center gap-3 pt-2">
            <View className="flex-row">
              <Entypo name="star" size={24} color={PRIMARY_COLOR} />
              <Entypo name="star" size={24} color={PRIMARY_COLOR} />
              <Entypo name="star" size={24} color={PRIMARY_COLOR} />
              <Entypo name="star" size={24} color={PRIMARY_COLOR} />
              <Entypo name="star" size={24} color={PRIMARY_COLOR} />
            </View>
            <TouchableOpacity>
              <Text className="text-grey">(225 reviews)</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-evenly w-11/12 pt-1">
            <View className="flex-row justify-center items-center gap-1">
              <Image source={require('../../../../assets/bike.png')} />
              <Text className="text-grey">Following</Text>
            </View>

            <View className="flex-row justify-center items-center gap-1">
              <Image source={require('../../../../assets/credit-card.png')} />
              <Text className="text-grey">Min. $10.00</Text>
            </View>
          </View>

          <View className="flex-row justify-evenly w-11/12 pt-1 mr-4 mt-1">
            <View className="flex-row justify-center items-center gap-1">
              <Image source={require('../../../../assets/time.png')} />
              <Text className="text-grey">(20-45) min</Text>
            </View>

            <View className="flex-row justify-center items-center mr-4">
              <Image source={require('../../../../assets/tag.png')} />
              <Text className="text-grey">-10%</Text>
            </View>
          </View>

          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileTopComponent;
