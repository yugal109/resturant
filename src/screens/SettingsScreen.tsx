import { StackActions } from '@react-navigation/native';
import * as React from 'react';
import { Alert, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { CheckForUpdatesModal } from '../components/CheckForUpdatesModal';
import configService from '../services/configService';
import loginService from '../services/loginService';
import { actions, useAppDispatch } from '../store';
import { Text } from '../ui';
import { OptionSwitch } from '../ui/elements/OptionSwitch';

type TProps = {
  navigation: any;
};

const SettingsScreen = ({ navigation }: TProps) => {
  const [isCheckForUpdatesModalVisible, setCheckForUpdatesModalVisible] = React.useState(false);
  const dispatcher = useAppDispatch();

  const logoutFn = React.useCallback(async () => {
    await loginService.logout();
    dispatcher(actions.authActions.setIsLoggedIn(false));
    navigation.dispatch(StackActions.replace('LoginScreen'));
  }, []);

  const [printerMode, setPrinterMode] = React.useState('BLUETOOTH');
  React.useEffect(() => {
    configService.getConfig<string>(configService.CONFIG_PRINTER_MODE).then((mode) => {
      setPrinterMode(mode);
    });
  }, []);

  return (
    <SafeAreaView className="px-4 py-6 flex-1">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setCheckForUpdatesModalVisible(true);
        }}
        className="px-3 py-2 bg-gray-800 rounded items-center mb-8 justify-center">
        <Text className="text-white text-center">Check For Updates</Text>
      </TouchableOpacity>

      <OptionSwitch
        title="Printer Mode"
        values={['Bluetooth', 'Serial USB']}
        textStyle="text-gray-700"
        selectedIndex={['BLUETOOTH', 'SERIAL'].indexOf(printerMode)}
        onIndexChange={(idx) => {
          const newItem = ['BLUETOOTH', 'SERIAL'][idx];
          configService.setConfig(configService.CONFIG_PRINTER_MODE, newItem);
          setPrinterMode(newItem);
        }}
      />
      <View className="flex-1" />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: logoutFn, style: 'destructive' },
          ]);
        }}
        className="px-3 py-2 border-2 bg-red-100 border-red-800 rounded items-center justify-center">
        <Text className="text-red-800 text-center" weight="bold">
          Log Out
        </Text>
      </TouchableOpacity>

      <CheckForUpdatesModal
        isVisible={isCheckForUpdatesModalVisible}
        onClose={() => {
          setCheckForUpdatesModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export { SettingsScreen };
