import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import { connect } from 'react-redux';

import { ScreenParamsList } from '../Navigation';
import { loginApi } from '../api/';
import configService from '../services/configService';
import { actions, AppDispatch } from '../store';
import { logger } from '../utils';

type TState = {
  email: string;
  password: string;
  isFetching: boolean;
};

type TProps = NativeStackScreenProps<ScreenParamsList, 'LoginScreen'> &
  ReturnType<typeof mapDispatchToProps>;

class LoginScreenImplementation extends React.Component<TProps, TState> {
  state: TState = {
    email: '',
    password: '',
    isFetching: false,
  };

  login = async () => {
    if (this.state.password.length < 1) return;
    this.setState({ isFetching: true });
    const isLoggedIn = await loginApi
      .adminLogin(this.state.email, this.state.password)
      .catch((err) => {
        logger.logError(err);
        Alert.alert('Login Failed', 'Login Failed. Try again.');
      });
    this.setState({ isFetching: false });
    this.props.setIsLoggedIn(!!isLoggedIn && !!isLoggedIn.token);
    if (isLoggedIn) {
      this.props.navigation.replace('AppBootstrapScreen');
    }
  };

  render(): React.ReactNode {
    const { isFetching } = this.state;

    return (
      <KeyboardAvoidingView
        className="flex-1 bg-gray-200 px-4"
        keyboardVerticalOffset={12}
        behavior="height"
        enabled>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <Image
            className="self-center mb-4 h-32 w-32"
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />

          <Text style={iOSUIKit.title3}>Username</Text>
          <TextInput
            className="bg-gray-100 px-2 py-4 mt-2 rounded-md border border-gray-300"
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          />

          <Text className="mt-6" style={iOSUIKit.title3}>
            Password
          </Text>
          <TextInput
            secureTextEntry
            className="bg-gray-100 px-2 py-4 mt-2 rounded-md border border-gray-300"
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
            onSubmitEditing={this.login}
          />
          <TouchableOpacity
            disabled={this.state.isFetching}
            activeOpacity={0.8}
            className="bg-blue-600 py-2 px-8 mt-6 rounded-md h-12 items-center justify-center"
            style={{ opacity: this.state.isFetching ? 0.5 : 1 }}
            onPress={this.login}>
            {isFetching && <ActivityIndicator />}
            {!isFetching && <Text className="text-center text-white text-2xl">Login</Text>}
          </TouchableOpacity>
        </ScrollView>
        <View className="items-center">
          <TouchableOpacity
            onPress={async () => {
              await configService.setConfig(configService.CONFIG_APP_MODE, 'FRONTEND');
              this.props.navigation.replace('Frontend');
            }}
            className="my-4 px-3 py-2 rounded border-blue-100 border bg-red-500">
            <Text className="text-white">Exit Terminal Mode</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setIsLoggedIn: (value: boolean) => {
    dispatch(actions.authActions.setIsLoggedIn(value));
  },
});
export const LoginScreen = connect(null, mapDispatchToProps)(LoginScreenImplementation);
