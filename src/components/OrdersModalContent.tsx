import { MaterialIcons } from '@expo/vector-icons';
import { isFuture, isToday } from 'date-fns';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sanFranciscoWeights } from 'react-native-typography';

import { dateUtils } from '../utils';
import { OrderDetailView } from './OrderDetailView';

type TProps = {
  onClose: () => void;
  order: App.Api.Order;
};
export const OrdersModalContent = ({ onClose, order }: TProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const parsedDate = dateUtils.parseOrderDate(order.attributes.order_date_time);
  const isFutureOrder = !isToday(parsedDate) && isFuture(parsedDate);
  return (
    <View
      className="flex-1 bg-slate-500"
      style={{
        backgroundColor: 'rgba(100, 116, 139, 0.8)',
        paddingTop: top + 8,
        paddingBottom: bottom + 8,
      }}>
      <View className="flex-1  mx-4 bg-white rounded">
        <View className="w-full bg-slate-700 px-4 py-4 rounded-t flex-row">
          <Text
            className="font-sans-bold text-center text-white flex-1"
            style={sanFranciscoWeights.bold}>
            Order {`#${order.id}`}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            className="absolute right-2 top-2 bottom-2 px-2 items-center justify-center bg-slate-800 rounded">
            <MaterialIcons name="close" color="#ddd" size={22} />
          </TouchableOpacity>
        </View>
        {isFutureOrder && (
          <View className="bg-red-700 py-2 flex-row justify-center">
            <MaterialIcons name="alarm" color="white" size={18} />
            <Text className="text-center text-white font-bold ml-2">
              This order is not fot today!
            </Text>
          </View>
        )}
        <OrderDetailView order={order} />
      </View>
    </View>
  );
};
