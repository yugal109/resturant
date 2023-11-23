import { MaterialIcons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sanFranciscoWeights } from 'react-native-typography';

type TProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const CheckForUpdatesModal = ({ isVisible, onClose }: TProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const [statusLabel, setStatusLabel] = useState('Checking for updates...');

  useEffect(() => {
    if (isVisible) {
      Updates.checkForUpdateAsync()
        .then((result) => {
          if (result.isAvailable) {
            setStatusLabel('Update available. Applying update...');
            Updates.fetchUpdateAsync()
              .then(() => {
                Updates.reloadAsync().catch(() => {});
              })
              .catch(() => {
                setStatusLabel('Error loading update');
              });
          }
        })
        .catch(() => {
          setStatusLabel('Error loading update');
        });
    }
  }, [isVisible]);

  return (
    <Modal transparent visible={isVisible} animationType="fade" onDismiss={onClose}>
      <View
        className="flex-1 bg-slate-500 items-center justify-center"
        style={{
          backgroundColor: 'rgba(100, 116, 139, 0.8)',
          paddingTop: top + 8,
          paddingBottom: bottom + 8,
        }}>
        <View className=" mx-4 bg-white rounded">
          <View className="w-full bg-slate-700 px-4 py-4 rounded-t flex-row">
            <Text
              className="font-sans-bold text-center text-white flex-1"
              style={sanFranciscoWeights.bold}>
              Updates
            </Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="absolute right-2 top-2 bottom-2 px-2 items-center justify-center bg-slate-800 rounded">
              <MaterialIcons name="close" color="#ddd" size={22} />
            </TouchableOpacity>
          </View>
          <View className="py-4 px-4">
            <Text>{statusLabel}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
