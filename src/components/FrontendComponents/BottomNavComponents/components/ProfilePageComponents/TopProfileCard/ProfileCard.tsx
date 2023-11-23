import React from 'react';
import { View, Text, Image } from 'react-native';

import { useAppSelector } from '../../../../../../store';

const ProfileCard = () => {
  const { profileData } = useAppSelector((state) => state.profile);

  return (
    <View className=" items-center p-5 shadow-md">
      <View className="bg-white flex-row items-center p-5 rounded-3xl">
        <Image
          source={require('../../../../../../../assets/Profile.png')}
          className=" w-20 h-20 mr-3 rounded-xl"
        />
        <View className="">
          <Text className="text-base font-bold mb-1">
            {profileData?.customer.first_name} {profileData?.customer.last_name}
          </Text>
          <Text className=" text-sm text-grey mb-1">{profileData?.customer.email}</Text>
          <View className="h-[1px] bg-grey my-1 w-11/12" />
          <Text className=" text-sm text-grey mb-1">{profileData?.customer.telephone}</Text>
          <View className="h-[1px] bg-grey my-1 w-11/12" />
          <Text className=" text-sm text-grey mb-1">Kwikstraat 8, 3078 Everberg</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileCard;
