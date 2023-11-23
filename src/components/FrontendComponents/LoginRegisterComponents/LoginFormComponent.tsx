import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import loginFrontEndUser from '../../../api/Frontend/frontLoginApi';
import SnackBarComponent from '../../../ui/elements/SnackBarComponent';
import { logError, logInfo } from '../../../utils/logger';
import resetAndPushScreen from '../../../utils/resetStack';

interface loginInfoInterface {
  email: string;
  password: string;
}

interface snackBarInfoInterface {
  message: string;
  type: 'info' | 'error' | 'success';
}

const LoginFormComponent = () => {
  const route = useRoute();
  const navigationRouteName = route.name;
  const navigation = useNavigation();

  const [snackBarInfo, setSnackbarInfo] = useState<snackBarInfoInterface | null>(null);

  const [loginInfo, setLoginInfo] = useState<loginInfoInterface>({
    email: 'yugalkhati570@gmail.com',
    password: 'pythonjs20',
  });

  const { email, password } = loginInfo;

  const [loading, setLoading] = useState<boolean>(false);

  const changeLoginInfo = (key: string, value: string) => {
    setLoginInfo({ ...loginInfo, [key]: value });
  };

  const loginUser = async () => {
    setLoading(true);
    try {
      const data = await loginFrontEndUser(email, password);
      setLoading(false);
      setSnackbarInfo({ message: data.message, type: 'success' });
      setTimeout(() => {
        resetAndPushScreen(navigation, 'ProfileOrder');
      }, 1000);
    } catch (e) {
      setLoading(false);
      setSnackbarInfo({ message: JSON.stringify(e), type: 'error' });
    }
  };

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
              ? 'bg-primary w-1/3 h-3 rounded-xl mt-1 '
              : 'w-1/3 rounded-xl h-3 '
          }`}>
          <Text />
        </View>
      </View>

      <ScrollView className="flex-1 mt-5 bg-screenBackground">
        <View className="flex-1 justify-evenly items-center space-y-3">
          <View className="w-4/5">
            <Text className="text-secondary w-4/5 text-lg font-medium">Email Address</Text>

            <TextInput
              value={email}
              onChangeText={(value) => changeLoginInfo('email', value)}
              className=" bg-userFormGrey rounded-3xl text-lg h-14 pl-4 m-1"
            />
          </View>

          <View className="w-4/5">
            <Text className="text-secondary  w-4/5 text-lg font-medium">Password</Text>
            <TextInput
              value={password}
              onChange={(value) => changeLoginInfo('password', password)}
              secureTextEntry
              className="h-14 bg-userFormGrey rounded-3xl text-lg pl-4 m-1"
            />
          </View>

          <View className="w-4/5">
            <Text className="text-primary text-lg">Forgot passcode?</Text>
          </View>
        </View>

        <View className="flex-1 items-center mt-3">
          {loading ? (
            <TouchableOpacity className="bg-primary h-16 w-3/4 items-center justify-center rounded-full">
              <Text className="text-secondary text-lg">Loading...</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => loginUser()}
              className="bg-primary h-16 w-3/4 items-center justify-center rounded-full">
              <Text className="text-secondary text-lg">Login</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity className="bg-primary h-16 w-3/4 items-center justify-center rounded-full my-5">
            <Text className="text-secondary text-lg">Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {snackBarInfo && (
        <SnackBarComponent message={snackBarInfo?.message} type={snackBarInfo?.type} />
      )}
    </>
  );
};

export default LoginFormComponent;
