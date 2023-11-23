import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { actions, useAppDispatch, useAppSelector } from '../../../../../store';

const ProfileSearchListItem = () => {
  const { menus, index } = useAppSelector((state) => state.profileOrderOrder);
  const appDispath = useAppDispatch();

  const changeIndex = (index: number) => {
    appDispath(actions.profileOrderOrderActions.setIndex(index));
  };
  return (
    <View className="w-full py-6 px-6 flex-row items-center bg-white ">
      <AntDesign name="search1" size={24} color="black" />

      <ScrollView showsHorizontalScrollIndicator={false} horizontal className="ml-5 space-x-7">
        {menus.map((loc) => (
          <>
            {loc.id === index ? (
              <Text className="text-primary mr-5">{loc.title}</Text>
            ) : (
              <Text onPress={() => changeIndex(loc.id)} className="text-gray-500 mr-5">
                {loc.title}
              </Text>
            )}
          </>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileSearchListItem;
