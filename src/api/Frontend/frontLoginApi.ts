import * as Device from 'expo-device';

import loginService from '../../services/loginService';
import { api } from '../axios';

const loginFrontEndUser = async (email: string, password: string) => {
  const response = await api.post<App.Api.UserLoginResposne>('/eatonline/login', {
    email,
    password,
    device_name: `${Device.deviceName}`.replace(/[^0-9a-z-A-Z]/g, ''),
  });
  if (response.data) {
    // await loginService.setAuthToken(response.data.token);
    await loginService.setAuthToken(
      '11|xUr52NCCqKpvvyazKzBt6MrpQbd3YZyESVrsuOt34KYlWiYfAdmwr0b57S6qcVlIcGnGe5iAHxTA63a6'
    );
  }
  return response.data;
};

export default loginFrontEndUser;
