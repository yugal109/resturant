import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text } from 'react-native';

import { actions, useAppDispatch, useAppSelector } from '../../../store';

const ProfileOrderListItems = () => {
  const { index } = useAppSelector((state) => state.profileOrders);
  const appDispatch = useAppDispatch();

  const changeIndex = (idx: number) => {
    if (index !== idx) {
      appDispatch(actions.profileOrderActions.changeIndex(idx));
    }
  };

  return (
    <View className="w-full flex-row mb-5">
      <View className=" w-1/4 items-center">
        <TouchableOpacity onPress={() => changeIndex(0)}>
          <Text className="">Order</Text>
        </TouchableOpacity>
        {index === 0 && (
          <View className="bg-primary rounded-lg mt-1 w-16 h-2">
            <Text />
          </View>
        )}
      </View>
      <View className="w-1/4 items-center">
        <TouchableOpacity onPress={() => changeIndex(1)}>
          <Text className="">Info</Text>
        </TouchableOpacity>
        {index === 1 && (
          <View className="bg-primary rounded-lg mt-2 w-16 h-2">
            <Text />
          </View>
        )}
      </View>

      <View className="w-1/4 items-center">
        <TouchableOpacity onPress={() => changeIndex(2)}>
          <Text className="">Offers</Text>
        </TouchableOpacity>
        {index === 2 && (
          <View className="bg-primary rounded-lg mt-2 w-16 h-2">
            <Text />
          </View>
        )}
      </View>

      <View className="w-1/4 items-center">
        <TouchableOpacity onPress={() => changeIndex(3)}>
          <Text className="">Reviews</Text>
        </TouchableOpacity>

        {index === 3 && (
          <View className=" bg-primary rounded-lg mt-2 w-16 h-2">
            <Text />
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileOrderListItems;
