import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { UserOrderInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { userOrderApi } from '../../api/Frontend/userOrderApi';
import { actions, useAppDispatch, useAppSelector } from '../../store';
import { formatDateTimeSec } from '../../utils/dateUtils';
import { logInfo } from '../../utils/logger';

const OrderList = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { loading, orders } = useAppSelector((state) => state.userOrders);
  const { userOrderActions } = actions;
  useEffect(() => {
    dispatch(userOrderActions.startLoading());
    userOrderApi()
      .then((response: UserOrderInterface) => {
        dispatch(userOrderActions.setUserOrders(response));
      })
      .catch((error) => {
        console.log(error);
      });
    // return () => {
    //   dispatch(userOrderActions.setEmptyUserOrders());
    // };
  }, []);
  return (
    <ScrollView className="flex-1 bg-screenBackground">
      {/* Order Profile */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {orders.map((order) => (
            <View key={order.id} className="flex-row items-center px-4 pt-2 m-2">
              <Image source={require('../../../assets/Ellipse.png')} className="mr-4 h-20 w-20" />
              <View className="flex-1">
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}>
                  <Text className=" text-lg font-bold text-black">Hello</Text>
                </TouchableOpacity>
                <Text className=" text-sm text-grey">
                  {formatDateTimeSec(order.attributes.order_date_time)}{' '}
                </Text>
                <Text className=" text-sm text-grey">Kwikstraat 8</Text>

                <View className="flex-row items-center ml-1">
                  <Ionicons name="ios-bicycle" size={24} color="grey" />
                  <Text className="text-sm text-grey font-bold ml-2">
                    {order.attributes.order_type_name}
                  </Text>
                  <Feather style={{ marginLeft: 12 }} name="credit-card" size={24} color="grey" />
                  <Text className="text-sm text-grey font-bold ml-2">$16.50</Text>
                </View>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default OrderList;
