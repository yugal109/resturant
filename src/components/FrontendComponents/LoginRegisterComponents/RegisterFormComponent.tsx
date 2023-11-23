import { AntDesign, Entypo } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { logError } from '../../../utils/logger';
import CircleRadio from '../ReusableComponents/CircleRadio';

// GoogleSignin.configure();

const RegisterFormComponent: FC = () => {
  const route = useRoute();
  const navigationRouteName = route.name;

  const signIn = async () => {};
  return (
    <>
      <View className="flex-row justify-around">
        <View
          className={`${
            navigationRouteName === 'LoginComponent'
              ? 'bg-primary w-1/3 h-3 rounded-xl mt-1'
              : 'w-1/3 rounded-xl h-3'
          }`}>
          <Text />
        </View>
        <View
          className={`${
            navigationRouteName === 'RegisterComponent'
              ? 'bg-primary w-1/3 h-3 rounded-xl mr-10 mt-1'
              : 'w-1/3 rounded-xl h-3'
          }`}>
          <Text />
        </View>
      </View>

      <ScrollView className="mt-3 bg-screenBackground">
        <View>
          <View className=" justify-center items-center mt-1">
            <TouchableOpacity className="bg-appleBlack flex-row items-center h-16 w-5/6 mt-2 rounded-full justify-center space-x-4">
              <AntDesign name="apple1" size={24} color="white" />
              <Text className=" text-lg text-white font-medium ">Sign In With Apple</Text>
            </TouchableOpacity>
          </View>
          <View className=" justify-center items-center mt-1">
            <TouchableOpacity className=" bg-facebookBlue flex-row items-center h-16 w-5/6 mt-2 rounded-full justify-center space-x-4 pl-6">
              <Entypo name="facebook" size={24} color="white" />
              <Text className="text-lg text-white font-medium">Sign In With Facebook</Text>
            </TouchableOpacity>
          </View>
          <View className=" justify-center items-center mt-1">
            <TouchableOpacity
              onMagicTap={signIn}
              className="bg-white flex-row items-center h-16 w-5/6 mt-2 rounded-full justify-center space-x-4">
              <AntDesign name="google" size={24} color="grey" />
              <Text className="ml-4 text-lg text-slate-400 font-medium">Sign In With Google</Text>
            </TouchableOpacity>
          </View>
          <View />
          <View />
        </View>
        <View className="justify-center items-center mt-4">
          <Text className="text-lg">OR</Text>
        </View>

        <View className="items-center mt-4 space-y-3">
          <View className="w-5/6">
            <Text className="text-secondary  text-lg font-medium ">First name</Text>
            <TextInput className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1" />
          </View>

          <View className="w-5/6">
            <Text className="text-secondary  text-lg font-medium ">Last name</Text>
            <TextInput className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1" />
          </View>

          <View className="w-5/6 ">
            <Text className="text-secondary text-lg font-medium">Email Address</Text>
            <TextInput className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1" />
          </View>

          <View className="w-5/6 ">
            <Text className="text-secondary text-lg font-medium">Mobile Number</Text>
            <TextInput className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1" />
          </View>

          <View className="w-5/6">
            <Text className="text-secondary text-lg font-medium">Password</Text>
            <TextInput
              className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1"
              secureTextEntry
            />
          </View>

          <View className="w-5/6">
            <Text className="text-secondary text-lg font-medium">Confirm Password</Text>
            <TextInput
              className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1"
              secureTextEntry
            />
          </View>

          <View className=" mx-7">
            <CircleRadio title="Yes, I want to receive discounts, offers and other updates." />
          </View>
        </View>

        <View className="flex-1 items-center">
          <TouchableOpacity className="bg-primary h-16 w-5/6 items-center justify-center rounded-full m-5">
            <Text className="text-secondary text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View className="opacity-60 items-center pb-3 mx-7">
          <Text className="text-base">
            By clicking in "Sign up", you agree to our
            <Text className="text-blue"> terms of use </Text>
            and
            <Text className="text-blue"> privacy policy</Text>
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterFormComponent;
