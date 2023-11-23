import { useNavigation } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';

const ProfileTopSkeletonComponent = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView>
      <View className="flex-row mx-9 space-x-40 mt-8 items-center">
        {/* <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity> */}

        <View>
          <Skeleton colorMode="light" radius={50} height={30} width={100} />
        </View>
      </View>
      <View className="w-full flex-row justify-center items-center px-5 pb-5 ">
        <View className="items-center w-1/4 rounded-full mt-6">
          <View className="justify-center items-center h-24 ">
            <Skeleton colorMode="light" radius="round" height={90} width={90} />
          </View>
        </View>
        <View className="items-center w-3/4">
          <View className="flex-row gap-2 mt-3">
            <TouchableOpacity className="px-4 py-2 rounded-full">
              <Skeleton colorMode="light" radius={50} height={30} width={100} />
            </TouchableOpacity>

            <TouchableOpacity className=" px-4 py-2 rounded-full">
              <Skeleton colorMode="light" radius={50} height={30} width={100} />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-center gap-3 pt-2">
            <View className="flex-row">
              <Skeleton colorMode="light" radius={50} height={25} width={230} />
            </View>
          </View>

          <View className="flex-row justify-evenly mt-2 w-11/12 pt-1">
            <View className="flex-row justify-center items-center gap-1">
              <Skeleton colorMode="light" radius={50} height={25} width={100} />
            </View>

            <View className="flex-row justify-center items-center gap-1">
              <Skeleton colorMode="light" radius={50} height={25} width={100} />
            </View>
          </View>

          <View />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileTopSkeletonComponent;
