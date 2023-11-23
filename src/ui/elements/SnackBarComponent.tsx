import React from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

interface paramsType {
  message: string;
  type: 'error' | 'success' | 'info';
}

const SnackBarComponent = ({ message, type }: paramsType) => {
  return (
    <Snackbar
      visible
      onDismiss={() => {}}
      style={{ backgroundColor: type === 'success' ? 'green' : 'red' }}
      className="bg-secondary h-8 w-96 items-center px-4 self-center">
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: 'white' }}>{message}</Text>
      </View>
    </Snackbar>
  );
};

export default SnackBarComponent;
