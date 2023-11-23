import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';

const ListSkeletor = () => {
  return (
    <View className="flex-1 ">
      <View className="flex-row items-center px-4 pt-2 m-2">
        <Skeleton colorMode="light" radius="round" height={80} width={80} />
        <View className="flex-1 ml-2">
          <View>
            <Skeleton colorMode="light" radius={50} height={25} width={250} />
          </View>
          <View className="mt-1">
            <Skeleton colorMode="light" radius={50} height={20} width={250} />
          </View>

          <View className="flex-row items-center ml-3 space-x-2">
            <View className="mt-1">
              <Skeleton colorMode="light" radius={50} height={20} width={100} />
            </View>
            <View className=" mt-1">
              <Skeleton colorMode="light" radius={50} height={20} width={100} />
            </View>
          </View>

          <View className="flex-row items-center ml-3 space-x-2">
            <View className="mt-1">
              <Skeleton colorMode="light" radius={50} height={20} width={100} />
            </View>
            <View className=" mt-1">
              <Skeleton colorMode="light" radius={50} height={20} width={100} />
            </View>
          </View>

          <View className="flex-row items-center ml-3 space-x-2">
            <View className=" mt-1">
              <Skeleton colorMode="light" radius={50} height={20} width={125} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListSkeletor;
