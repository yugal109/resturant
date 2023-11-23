import React from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';

const UserChangePassword = () => {
  return (
    <View className=" bg-screenBackground h-full">
      <View className="m-4">
        <Text className=" text-black/50 text-lg">Old Password</Text>
        <TextInput className={` bg-userFormGrey rounded-3xl mt-3 p-4 }`} />
      </View>

      <View className="m-4">
        <Text className=" text-black/50 text-lg">New Password</Text>
        <TextInput className={` bg-userFormGrey rounded-3xl mt-3 p-4 }`} />
      </View>

      <View className="m-4">
        <Text className=" text-black/50 text-lg">Confirm Password</Text>
        <TextInput className={` bg-userFormGrey rounded-3xl mt-3 p-4 }`} />
      </View>

      <View className="items-center m-6">
        <TouchableOpacity className=" bg-primary  rounded-full p-5 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-secondary text-lg text-center">Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserChangePassword;
