import { Feather, Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import { UserOneOrderInterface } from '../../api/Frontend/apiTypes/baseFrontEndApiType';
import { userOneOrderApi } from '../../api/Frontend/userOrderApi';
import { actions, useAppDispatch, useAppSelector } from '../../store';
import { formatDateTimeSec } from '../../utils/dateUtils';

const OrderDetails = () => {
  const { loading, order } = useAppSelector((state) => state.userOneOrder);
  const { setUserOneOrders, startLoading } = actions.userOneOrderActions;
  const { orderId } = useRoute().params as { orderId: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(startLoading());
    userOneOrderApi(`${orderId}`)
      .then((response: UserOneOrderInterface) => {
        // console.log(response.data);
        dispatch(setUserOneOrders(response));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderId]);

  const mainOrderComponent = order && (
    <ScrollView className="flex-1 bg-screenBackground">
      {/* Order Profile */}
      <View className="flex-row items-center px-4 pt-2 m-2">
        <Image source={require('../../../assets/Ellipse.png')} className="mr-4 h-20 w-20" />
        <View className="flex-1">
          <View>
            <Text className=" text-lg font-bold text-black">Hello</Text>
          </View>
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
            <Text className="text-sm text-grey font-bold ml-2">
              {order.attributes.currency} 16.50
            </Text>
          </View>
        </View>
      </View>

      {/* Order Type */}
      <View className="mt-5">
        <Text className=" text-2xl font-medium ml-5">Order #446</Text>
        <View className="bg-white">
          {/* Order 1 */}
          <View className=" mx-5 my-3 flex-row justify-between">
            <View className="flex-1">
              <Text className=" font-medium text-2xl">Vol au vent</Text>
              <Text className=" text-lg text-secondary/50">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
              </Text>
            </View>
            <Text className=" font-medium text-2xl text-primary">$16.50</Text>
          </View>

          {/* Order 2 */}
          <View className="mx-5 my-3 flex-row justify-between">
            <View className="flex-1">
              <Text className=" font-medium text-2xl">Vol au vent</Text>
              <Text className=" text-lg text-secondary/50">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
              </Text>
            </View>
            <Text className=" font-medium text-2xl text-primary">$16.50</Text>
          </View>
        </View>
      </View>

      {/* Order status */}
      <View className="bg-white p-5 mt-4">
        <View className="pt-2 flex-row justify-between">
          <Text className="text-lg text-secondary/50">Subtotal</Text>
          <Text className="text-lg text-secondary/50">€ 26,00</Text>
        </View>

        <View className="pt-2 flex-row justify-between">
          <Text className="text-lg text-secondary/50">Delivery Costs</Text>
          <Text className="text-lg text-secondary/50">FREE</Text>
        </View>

        <View className="pt-2 flex-row justify-between">
          <Text className="text-lg text-secondary/50">Discount Code</Text>
          <Text className="text-lg text-secondary/50">-€ 5,00</Text>
        </View>

        <View className="pt-2 flex-row justify-between">
          <Text className="text-lg text-secondary/50">Total</Text>
          <Text className="text-lg text-secondary/50">€ 21,00</Text>
        </View>

        <View className="pt-6">
          <Text className=" text-2xl text-secondary/50">Order Status</Text>
          <Text className=" text-lg text-secondary/50 uppercase">
            {order.attributes.status_name}
          </Text>
        </View>

        <View className="pt-6">
          <Text className=" text-2xl text-secondary/50">Your Order Note</Text>
          <Text className=" text-lg text-secondary/50 ">This order is a test order</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        mainOrderComponent
      )}
    </>
  );
};

export default OrderDetails;
