import { GestureHandlerRootView } from 'react-native-gesture-handler';

import './app';

// Intl polyfil
import 'intl';
import 'intl/locale-data/jsonp/nl-BE'; // or any other locale you need
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import * as Sentry from 'sentry-expo';

import Navigation from './src/Navigation';
import { SENTRY_DSN } from './src/config';
import store from './src/store';
import { isTerminalModel } from './src/utils';

if (!__DEV__) {
  Sentry.init({
    dsn: SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: __DEV__, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  });
}
export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Italic': require('./assets/fonts/Poppins-Italic.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (isTerminalModel()) {
      // TODO check if terminal mode.
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBackgroundColorAsync('steelblue');
      NavigationBar.setBehaviorAsync('overlay-swipe');
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const isAppReady = fontsLoaded;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1" onLayout={onLayoutRootView}>
        <MenuProvider>
          <Provider store={store}>
            <NavigationContainer>
              {isAppReady && <Navigation />}
              <StatusBar style="light" />
            </NavigationContainer>
          </Provider>
        </MenuProvider>
      </View>
    </GestureHandlerRootView>
  );
}
