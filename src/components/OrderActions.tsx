import { MaterialCommunityIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import * as dateFns from 'date-fns';
import React, { ComponentProps, useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import colors from 'tailwindcss/colors';

import { ordersApi } from '../api';
import { actions, useAppDispatch } from '../store';
import { dateUtils, orderUtils, printerUtils } from '../utils';
import { ORDER_STATUS_MAP } from '../utils/orderUtils';
import { useIsPrintingAvailable } from '../utils/printerUtils';

export const OrderConfirmTime = ({
  order,
  isModeTimeUpdate,
  onTimeUpdate,
}: {
  order: App.Api.Order;
  isModeTimeUpdate: boolean;
  onTimeUpdate: () => void;
}) => {
  const [selectedConfirmTime, setSelectedConfirmTime] = useState<Date>();
  const orderStatusId = `${order.attributes.status_id}`;

  const parsedDate = dateUtils.parseOrderDate(order.attributes.order_date_time);
  const isFutureOrder = !dateFns.isToday(parsedDate) && dateFns.isFuture(parsedDate);

  const appDispatch = useAppDispatch();
  const isPrintingAvailable = useIsPrintingAvailable();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const confirmOrder = useCallback(
    async (selectedTime: Date) => {
      if (isFetching) return;
      setIsFetching(true);
      await ordersApi
        .confirmOrder(
          order.id,
          selectedTime,
          isModeTimeUpdate ? orderStatusId : ORDER_STATUS_MAP.PENDING // keep current statusId if time change, else change status to pending
        )
        .then((order) => {
          appDispatch(actions.ordersActions.updateOrder(order));
          if (!isModeTimeUpdate && isPrintingAvailable && !isFutureOrder) {
            printerUtils.printOrder(order).catch(() => {});
          }
          onTimeUpdate();
          // hide modal?
        })
        .catch((err) => {
          Alert.alert('Error accepting order', `${err}`);
        });
      setIsFetching(false);
    },
    [order, isFetching, isModeTimeUpdate, isPrintingAvailable, isFutureOrder]
  );

  const isAsap = order.attributes.order_time_is_asap;
  const requestedTime =
    isAsap && !isModeTimeUpdate
      ? dateUtils.addMinutesToDate(new Date(), 10) // start from 10 minutes from now (MAYBE should fetch this backend?)
      : new Date(order.attributes.order_date_time);

  const orderTime = selectedConfirmTime || requestedTime;
  const isConfirmDisabled = !orderTime || isFetching;

  const canSelectEarlierTime = dateFns.isFuture(dateUtils.addMinutesToDate(orderTime, -10));

  return (
    <View className="flex-row items-center">
      <View className="flex-1 flex-row justify-start items-center">
        <TouchableHighlight
          activeOpacity={0.8}
          disabled={!canSelectEarlierTime}
          onPress={() => {
            setSelectedConfirmTime(dateUtils.addMinutesToDate(orderTime, -10));
          }}
          className={clsx(
            'rounded items-center justify-center bg-blue-500 h-12 w-12',
            !canSelectEarlierTime && 'bg-slate-300'
          )}>
          <MaterialCommunityIcons name="minus" color="#fff" size={22} />
        </TouchableHighlight>
        <Text className="mx-1 font-bold text-xl">{dateUtils.formattedTime(orderTime)}</Text>
        <TouchableHighlight
          onPress={() => {
            setSelectedConfirmTime(dateUtils.addMinutesToDate(orderTime, 10));
          }}
          activeOpacity={0.8}
          className="rounded items-center justify-center bg-blue-500 h-12 w-12">
          <MaterialCommunityIcons name="plus" color="#fff" size={22} />
        </TouchableHighlight>
      </View>

      <TouchableOpacity
        disabled={isConfirmDisabled}
        onPress={() => {
          confirmOrder(orderTime);
        }}
        className={clsx(
          'w-24 h-12 rounded justify-center items-center border bg-green-600 border-green-700',
          isConfirmDisabled && 'bg-gray-400 border-gray-400'
        )}>
        {isFetching && <ActivityIndicator color="white" size="small" />}
        {!isFetching && (
          <Text className="font-sans font-bold text-lg text-white text-center">
            {isModeTimeUpdate ? 'Change' : 'Accept'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const OrderUpdateStatusActions = ({ order }: { order: App.Api.Order }) => {
  const orderStatusId = `${order.attributes.status_id}`;
  const isOrderCanceled = orderStatusId === ORDER_STATUS_MAP.CANCELED;

  return isOrderCanceled ? (
    <View>
      <Text className="text-red-700 font-xl font-bold text-center">Order Is Canceled</Text>
    </View>
  ) : (
    <OrderStatusActions
      orderId={order.id}
      orderStatusId={`${order.attributes.status_id}`}
      orderType={order.attributes.order_type}
    />
  );
};

const OrderStatusActions = ({
  orderId,
  orderStatusId,
  orderType,
}: {
  orderId: string;
  orderStatusId: string;
  orderType: App.Api.OrderType;
}) => {
  const appDispatch = useAppDispatch();

  const [isFetching, setIsFetching] = React.useState(false);
  const [fetchingStatusId, setFetchingStatusId] =
    React.useState<keyof typeof ORDER_STATUS_MAP>('PREPARATION');

  const updateStatus = React.useCallback(
    (status: keyof typeof ORDER_STATUS_MAP) => {
      if (isFetching) return;

      setFetchingStatusId(status);
      setIsFetching(true);

      ordersApi
        .updateOrderStatus(orderId, status)
        .then((order) => {
          appDispatch(actions.ordersActions.updateOrder(order));
        })
        .catch((err) => {
          Alert.alert('Error updating', `${err}`);
        })
        .finally(() => {
          setIsFetching(false);
        });
    },
    [isFetching]
  );

  const onCancelOrder = React.useCallback(() => {
    Alert.alert('Cancel Order', 'Do you really want to cancel the order?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          updateStatus('CANCELED');
        },
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  }, []);

  const kitchenActive = orderStatusId >= ORDER_STATUS_MAP.PREPARATION;
  const deliveryActive = orderStatusId >= ORDER_STATUS_MAP.DELIVERY;
  const completeActive = orderStatusId >= ORDER_STATUS_MAP.COMPLETED;

  return (
    <View className="">
      <View className="flex-row">
        <View className="flex-row mb-1 overflow-hidden rounded">
          <StatusButton
            isActive={kitchenActive}
            isFetching={fetchingStatusId === 'PREPARATION' && isFetching}
            icon={orderUtils.orderStatusIdToIcon(ORDER_STATUS_MAP.PREPARATION, orderType)}
            onPress={() => {
              updateStatus('PREPARATION');
            }}
          />
          <StatusButton
            isActive={deliveryActive}
            isFetching={fetchingStatusId === 'DELIVERY' && isFetching}
            icon={orderUtils.orderStatusIdToIcon(ORDER_STATUS_MAP.DELIVERY, orderType)}
            onPress={() => {
              updateStatus('DELIVERY');
            }}
          />
          <StatusButton
            isActive={completeActive}
            isFetching={fetchingStatusId === 'COMPLETED' && isFetching}
            isLastItem
            icon={orderUtils.orderStatusIdToIcon(ORDER_STATUS_MAP.COMPLETED, orderType)}
            onPress={() => {
              updateStatus('COMPLETED');
            }}
          />
        </View>
        <View className="flex-1" />

        <Menu>
          <MenuTrigger>
            <View className="bg-gray-500 rounded py-4 px-4 ml-4 items-center justify-center">
              {isFetching && fetchingStatusId === 'CANCELED' ? (
                <ActivityIndicator color="white" />
              ) : (
                <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
              )}
            </View>
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              paddingVertical: 12,
            }}>
            <MenuOption className="px-3 py-3 flex-row items-center" onSelect={onCancelOrder}>
              <MaterialCommunityIcons name="cancel" color={colors.red[500]} size={18} />
              <Text className="font-bold text-red-500 ml-1" style={{ marginTop: 2 }}>
                Cancel Order
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <Text>Order Status Status: {orderUtils.orderStatusIdToLabel(orderStatusId, orderType)}</Text>
    </View>
  );
};

const StatusButton = ({
  isActive,
  isFetching,
  isLastItem,
  icon,
  onPress,
}: {
  isLastItem?: boolean;
  isActive: boolean;
  isFetching?: boolean;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={clsx(
        'py-4 w-20 items-center justify-center border-r border-gray-400',
        isActive ? 'bg-lime-600' : 'bg-gray-500',
        isLastItem && 'border-r-0'
      )}>
      {isFetching ? (
        <ActivityIndicator color="white" />
      ) : (
        <MaterialCommunityIcons size={26} color="white" name={icon} />
      )}
    </TouchableOpacity>
  );
};
