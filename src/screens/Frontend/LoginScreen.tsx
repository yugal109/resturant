import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View, Image } from 'react-native';

import LoginFormComponent from '../../components/FrontendComponents/LoginRegisterComponents/LoginFormComponent';
import RegisterFormComponent from '../../components/FrontendComponents/LoginRegisterComponents/RegisterFormComponent';
// import RegisterFormComponent from '../../components/FrontendComponents/LoginRegisterComponents/RegisterFormComponent';
// import loginService from '../../services/loginService';
// import checkIfLogin from '../../utils/checkIfUserIsLoggedIn';

export type ScreenParamsList = {
  LoginComponent: undefined;
  RegisterComponent: undefined;
};

const LogRegisterStack = createStackNavigator<ScreenParamsList>();

type TProps = {
  navigation: any;
};

const LoginScreenFE = ({ navigation }: TProps) => {
  // useEffect(() => {
  //   checkIfLogin(navigation);
  // }, []);

  return (
    <View className="flex-1">
      <View className="bg-secondary items-center justify-center rounded-b-3xl">
        <Image
          source={require('../../../assets/new_background_logo.png')}
          className=" opacity-30  rounded-b-3xl h-60 w-full"
        />
        <Image
          source={require('../../../assets/new_logo.png')}
          className="absolute w-[151px] h-[116px] "
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-around ">
          <Text
            onPress={() => navigation.navigate('LoginComponent')}
            className="text-white font-bold text-lg -mt-7">
            Login
          </Text>
          <Text
            onPress={() => navigation.navigate('RegisterComponent')}
            className="text-white font-bold text-lg -mt-7 mr-7">
            Sign-up
          </Text>
        </View>

        <LogRegisterStack.Navigator screenOptions={{ animationEnabled: false }}>
          <LogRegisterStack.Screen
            name="LoginComponent"
            component={LoginFormComponent}
            options={{ headerShown: false }}
          />
          <LogRegisterStack.Screen
            name="RegisterComponent"
            component={RegisterFormComponent}
            options={{ headerShown: false }}
          />
        </LogRegisterStack.Navigator>
      </View>
    </View>
  );
};

export default LoginScreenFE;
