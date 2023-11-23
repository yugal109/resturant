import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  CONFIG_PRINTER_MODE: 'config:printer-mode',
  CONFIG_APP_MODE: 'config:app-mode',
  async setConfig(key: string, value: string) {
    return AsyncStorage.setItem(key, `${value}`);
  },
  async getConfig<T>(key: string, defaultValue?: T): Promise<T> {
    return AsyncStorage.getItem(key).catch((e) => {
      if (defaultValue) return defaultValue;
      throw e;
    }) as T;
  },
};
