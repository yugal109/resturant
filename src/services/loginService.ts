import AsyncStorage from '@react-native-async-storage/async-storage';

import { logInfo } from '../utils/logger';

export default {
  TOKEN_KEY: 'login:token-storage-key',
  ACTIVE_LOCATION_ID: 'login:active-location-id',
  setAuthToken(authToken: string) {
    return AsyncStorage.setItem(this.TOKEN_KEY, authToken);
  },
  async getAuthToken() {
    return await AsyncStorage.getItem(this.TOKEN_KEY);
  },

  async isLoggedIn() {
    return (await this.getAuthToken()) != null;
  },

  async setActiveLocationId(businessId: string) {
    return AsyncStorage.setItem(this.ACTIVE_LOCATION_ID, `${businessId}`);
  },
  async getActiveLocationId() {
    return AsyncStorage.getItem(this.ACTIVE_LOCATION_ID);
  },
  async logout() {
    return AsyncStorage.multiRemove([this.TOKEN_KEY, this.ACTIVE_LOCATION_ID]);
  },
};
