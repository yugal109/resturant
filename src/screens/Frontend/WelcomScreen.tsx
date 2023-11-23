import { useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { LOGIN_SCREEN } from './constants/ScreenConstants';
import checkIfLogin from '../../utils/checkIfUserIsLoggedIn';

// TAILWIND

type TProps = {
  navigation: any;
};

const SplashScreen = ({ navigation }: TProps) => {
  // useEffect(() => {
  //   checkIfLogin(navigation);
  // }, []);

  return (
    <View className=" flex-1 justify-center items-center">
      <View className="flex-[1.3] w-full justify-center items-center bg-secondary">
        <Image
          source={require('../../../assets/new_background_logo.png')}
          className="w-full h-full opacity-60  "
        />
        <Image source={require('../../../assets/new_logo.png')} className="absolute " />
      </View>
      <View className=" flex-[2] w-full bg-primary justify-evenly items-center rounded-t-3xl -mt-7">
        <View className="rounded-full">
          <Image source={require('../../../assets/user.png')} />
        </View>

        <View className=" justify-center items-center">
          <Text className="text-4xl font-bold leading-10 tracking-wide text-secondary ">
            Welcome to
          </Text>
          <Text className="text-4xl font-bold leading-10 tracking-wide text-secondary ">
            EatOnline.be
          </Text>
        </View>

        <View className="justify-center items-center">
          <Text className="text-secondary text-base">Make an account and enjoy your</Text>
          <Text className="text-secondary text-base">free pint on your first order</Text>
          <Text className="text-secondary text-base">-Sante</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(LOGIN_SCREEN)}
          className="w-80 h-16 bg-white text-primary rounded-full justify-center items-center ">
          <Text className=" text-lg text-secondary self-center ">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
