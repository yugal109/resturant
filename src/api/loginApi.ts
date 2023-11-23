import * as Device from 'expo-device';

import { api } from './axios';
import loginService from '../services/loginService';

export async function adminLogin(username: string, password: string) {
  const response = await api.post<App.Api.LoginResposne>('/token', {
    username,
    password,
    device_name: `${Device.deviceName}`.replace(/[^0-9a-z-A-Z]/g, ''),
  });

  if (response.data) {
    await loginService.setAuthToken(response.data.token);
  }

  return response.data;
}
