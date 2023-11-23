import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function NoInternetConnection() {
  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <Image source={require('../../../assets/nointernet.png')} />
      </View>
      <View>
        <Text className="mt-5 font-semibold text-2xl leading-8 ">No Internet Connection</Text>
      </View>
      <View>
        <Text className="mt-3 text-lg leading-6 opacity-60 self-center">
          Your internet connection is currently
        </Text>
        <Text className="text-lg leading-6 opacity-60">
          {' '}
          not available please check or try again.
        </Text>
      </View>
      <View>
        <TouchableOpacity className=" mt-14 w-80 h-20 bg-primary items-center justify-center rounded-full">
          <Text className=" text-white text-lg">Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
