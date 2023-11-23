import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import colors from 'tailwindcss/colors';

import { Text } from '../ui';
import { dateUtils, orderUtils, printerUtils } from '../utils';
import { ORDER_STATUS_MAP } from '../utils/orderUtils';
import { useIsPrintingAvailable } from '../utils/printerUtils';
import { OrderUpdateStatusActions, OrderConfirmTime } from './OrderActions';

type TProps = {
  order: App.Api.Order;
  isDetailPage?: boolean;
};

export class OrderDetailView extends React.Component<TProps> {
  render() {
    const { order, isDetailPage } = this.props;

    // whether the current time (which will be shown) a requested time or confirmed (by restaurant) time
    const isOrderTimeStatusRequest = `${order.attributes.status_id}` === ORDER_STATUS_MAP.RECEIVED;

    const orderTime =
      order.attributes.order_time_is_asap && isOrderTimeStatusRequest
        ? 'ASAP'
        : dateUtils.formattedTime(new Date(order.attributes.order_date_time));

    return (
      <View className="flex-1 pt-2">
        <View className="border-b border-gray-300 pb-3 flex-row px-3">
          <View className="items-center justify-center pr-3">
            <MaterialIcons
              name={order.attributes.order_type === 'delivery' ? 'delivery-dining' : 'shopping-bag'}
              color={colors.slate[700]}
              size={32}
            />
          </View>
          <View className="flex-1">
            <Text className="text-base" weight="bold">
              {order.attributes.customer_name}
            </Text>
            <Text>{order.attributes.telephone}</Text>
          </View>
          <OrderPrintButton order={order} />
        </View>
        {!!isDetailPage && (
          <View className="py-3 px-3 bg-gray-300 ">
            <OrderUpdateStatusActions order={order} />
          </View>
        )}

        <View className="pt-2 flex-1">
          <ScrollView
            contentContainerStyle={{ paddingBottom: 22 }}
            className="mx-2 pb-4"
            showsVerticalScrollIndicator={false}>
            <View className="py-2 border-b border-gray-300 flex-row">
              <View className="flex-1">
                <Text>
                  <Text className="font-bold">Payment:</Text>{' '}
                  {orderUtils.paymentCodeToText(order.attributes.payment)}
                </Text>
                {order.attributes.order_type === 'delivery' && (
                  <>
                    <Text className="font-bold">Address:</Text>
                    <Text>{order.attributes.formatted_address}</Text>
                  </>
                )}

                {!!order.attributes.comment && (
                  <Text className="mt-2">
                    <Text className="font-bold">Note: </Text>
                    {order.attributes.comment}
                  </Text>
                )}
              </View>

              <View className="border-l px-3 border-gray-200 justify-center">
                <Text className="text-2xl font-bold text-center text-blue-700" weight="light">
                  {orderTime}
                </Text>

                <Text
                  className={clsx(
                    'text-sm text-center',
                    isOrderTimeStatusRequest ? 'text-orange-500' : 'text-blue-800'
                  )}>
                  {isOrderTimeStatusRequest ? ' requested' : 'accepted'}
                </Text>
              </View>
            </View>

            {this.props.order.attributes.order_menus.map((item) => {
              return (
                <View key={item.order_menu_id} className="border-b border-gray-300 py-3 flex-col">
                  <View className="w-full flex-row">
                    <Text className="mr-4">{item.quantity} </Text>
                    <View className="flex-1">
                      <Text>{item.name}</Text>
                      {item.menu_options.map((option) => {
                        return (
                          <View className="flex-row" key={option.order_menu_option_id}>
                            <Text className="mr text-sm">{option.order_option_category}: </Text>
                            <Text className="mr-1 text-sm">{option.quantity}</Text>
                            <Text className="text-sm">{option.order_option_name}</Text>
                          </View>
                        );
                      })}
                    </View>
                    <Text className=" text-right">
                      {orderUtils.formatAmount(item.subtotal, order.attributes.currency)}
                    </Text>
                  </View>
                  {!!item.comment && (
                    <Text className="text-xs text-gray-500">
                      <Text className="font-bold">Note:</Text> {item.comment}
                    </Text>
                  )}
                </View>
              );
            })}
            <View className="items-end w-full mt-5">
              {order.attributes.order_totals.map((total) => {
                return (
                  <Text
                    key={total.order_total_id}
                    className={clsx(total.code === 'total' ? 'font-bold' : '')}>{`${
                    total.title
                  }: ${orderUtils.formatAmount(total.value, order.attributes.currency)}`}</Text>
                );
              })}
            </View>

            <View className="mt-5 bg-gray-300 py-2 mb-4">
              <Text className="text-center">
                Order for: {dateUtils.formatDate(order.attributes.order_date_time)}
              </Text>
            </View>
          </ScrollView>
          <View className="border-t border-gray-300 py-2 px-4">
            <OrderConfirmTime
              order={order}
              isModeTimeUpdate={isDetailPage || false}
              onTimeUpdate={() => {}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const OrderPrintButton = ({ order }: { order: App.Api.Order }) => {
  const isPrintingAvailable = useIsPrintingAvailable();

  if (!isPrintingAvailable) return null;
  return (
    <TouchableOpacity
      onPress={() => {
        printerUtils.printOrder(order);
      }}
      className="px-3 ml-2 py-2 border border-gray-300 rounded-sm justify-center items-center">
      <MaterialCommunityIcons color={colors.gray[500]} name="printer" size={22} />
    </TouchableOpacity>
  );
};
