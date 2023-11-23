import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import clsx from 'clsx';
import { addDays, isToday } from 'date-fns';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React, { useState } from 'react';
import {
  Alert,
  ListRenderItem,
  TouchableOpacity,
  View,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { iOSUIKit } from 'react-native-typography';
import { connect } from 'react-redux';

import { ScreenParamsList } from '../Navigation';
import { ordersApi } from '../api';
import { actions, AppDispatch, RootState } from '../store';
import { Text } from '../ui';
import { dateUtils, orderUtils } from '../utils';

type TState = {
  isFetching: boolean;
  mappedOrders?: orderUtils.OrderGroup[];
  orderIdOfStatusUpdating?: string;
};

type TProps = NativeStackScreenProps<ScreenParamsList, 'OrdersListScreen'> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export class OrdersListScreenImpl extends React.Component<TProps, TState> {
  state: TState = {
    isFetching: false,
    mappedOrders: [],
    orderIdOfStatusUpdating: undefined,
  };

  componentDidMount() {
    activateKeepAwake().catch(() => {});
    const selectedDate = this.props.route.params?.selectedDate || new Date();
    this.onDateChange(new Date(selectedDate));
  }

  componentWillUnmount() {
    deactivateKeepAwake().catch(() => {});
  }

  componentDidUpdate(prevProps: Readonly<TProps>): void {
    if (
      prevProps.orders !== this.props.orders ||
      prevProps.futureOrders !== this.props.futureOrders
    ) {
      const ordersSection = orderUtils.groupOrdersByOrderStatus(
        this.props.orders,
        this.props.futureOrders
      );
      this.setState({ mappedOrders: ordersSection });
    }
  }

  onDateChange = (newDate: Date) => {
    this.props.navigation.setParams({ selectedDate: newDate.getTime() });
    this.fetchData(newDate);
  };

  fetchData = async (selectedDate: Date) => {
    const { isFetching } = this.state;
    const { locationid } = this.props;

    if (isFetching || !locationid) return;
    this.setState({ isFetching: true });

    const [start, end] = dateUtils.makeFilterDateForDay(selectedDate);

    if (isToday(selectedDate)) {
      this.loadFutureOrders(locationid, end).catch(() => {});
    }

    const orders = await ordersApi.getOrders(start, end, locationid).catch((err) => {
      Alert.alert('Error fetching data', `${err}`);
      return undefined;
    });
    if (orders) {
      this.props.setOrdersForDate(dateUtils.formatDate(selectedDate), orders);
    }
    this.setState({ isFetching: false });
  };

  refreshData = () => {
    const selectedDate = this.props.route.params?.selectedDate || new Date();
    this.fetchData(new Date(selectedDate));
  };

  loadFutureOrders = async (locationId: string, since: Date) => {
    const futureOrders = await ordersApi
      .getOrders(since, addDays(since, 5), locationId) // orders upto 5 days in future
      .catch(() => undefined);

    if (futureOrders) {
      this.props.addOrders(futureOrders);
    }
  };

  navigateToDetail = (order: App.Api.Order) => {
    this.props.navigation.navigate('OrderDetailScreen', {
      orderId: order.attributes.order_id,
    });
  };

  renderOrder: ListRenderItem<App.Api.Order> = ({ item }) => {
    return (
      <OrderRow
        order={item}
        onPress={this.navigateToDetail}
        onDownPress={this.orderStatusToNextStep}
        isStatusUpdating={item.id === this.state.orderIdOfStatusUpdating}
      />
    );
  };

  orderStatusToNextStep = async (order: App.Api.Order) => {
    if (
      !orderUtils.canOrderStatusChangeFromList(order.attributes.status_id) ||
      this.state.orderIdOfStatusUpdating
    ) {
      return;
    }
    this.setState({ orderIdOfStatusUpdating: order.id });
    // do rest:
    const newStatusId = orderUtils.getNextStatusIdToChangeFromList(order.attributes.status_id);
    const updatedOrder = await ordersApi
      .updateOrderStatusWithId(order.id, newStatusId)
      .finally(() => {
        this.setState({ orderIdOfStatusUpdating: undefined });
      });
    this.props.updateOrder(updatedOrder);
  };

  render() {
    const { mappedOrders } = this.state;
    const selectedDate = this.props.route.params?.selectedDate;
    if (!selectedDate) {
      return null;
    }

    const hasNoContent = !this.state.isFetching && !mappedOrders?.length;

    return (
      <SafeAreaView className="flex-1 bg-sky-600">
        <SearchBar
          selectedDate={new Date(selectedDate)}
          onDateSelect={(date) => {
            this.onDateChange(date);
          }}
        />
        {hasNoContent ? (
          <View className="flex-1 items-center justify-center mb-8">
            <MaterialCommunityIcons name="food" color="#ddd" size={152} />
            <Text className="text-2xl font-sans" style={[{ color: '#ddd' }]}>
              No orders on this day
            </Text>
          </View>
        ) : (
          <>
            <SectionList
              className="pt-2"
              sections={mappedOrders ?? []}
              refreshing={this.state.isFetching}
              onRefresh={this.refreshData}
              renderItem={this.renderOrder}
              keyExtractor={(i) => i.id}
              renderSectionFooter={({ section }) => {
                if (!section.data?.length) {
                  return (
                    <View className="py-5 items-center">
                      <MaterialCommunityIcons size={32} color="white" name={section.icon} />
                      <Text className="text-center text-white font-sans mt-4">
                        {section.emptyMessage}
                      </Text>
                    </View>
                  );
                }
                return null;
              }}
              renderSectionHeader={({ section: { title, isFuture } }) => (
                <View className={clsx('px-6 py-4', isFuture ? 'bg-orange-600' : 'bg-lime-600')}>
                  <Text className="font-bold text-white text-sm" weight="semibold">
                    {title}
                  </Text>
                </View>
              )}
            />
          </>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: NativeStackScreenProps<ScreenParamsList, 'OrdersListScreen'>
) => {
  const selectedDate = ownProps.route.params?.selectedDate;

  const ordersDate = selectedDate ? dateUtils.formatDate(new Date(selectedDate)) : undefined;
  const orderIds = ordersDate ? state.orders.orderIdsByDate[ordersDate] : undefined;
  const orders = (orderIds || [])
    .map<App.Api.Order>((orderId) => state.orders.ordersById[orderId]!)
    .filter(Boolean);

  const futureOrderIds =
    selectedDate && isToday(new Date(selectedDate)) ? state.orders.futureOrderIds : [];
  const futureOrders = (futureOrderIds || [])
    .map<App.Api.Order>((orderId) => state.orders.ordersById[orderId]!)
    .filter(Boolean);

  return {
    locationid: state.auth.activeLocation?.id,
    orderIdsByDate: state.orders.orderIdsByDate,
    ordersLastCheckedAt: state.orders.newOrdersCheckedAt,
    orders,
    futureOrders,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setOrdersForDate(date: string, pagination: App.Api.Pagination<App.Api.Order>) {
    dispatch(actions.ordersActions.setOrdersOnDate({ date, orders: pagination }));
  },
  addOrders(orders: App.Api.Pagination<App.Api.Order>) {
    dispatch(actions.ordersActions.addOrders(orders));
  },
  updateOrder(order: App.Api.Order) {
    dispatch(actions.ordersActions.updateOrder(order));
  },
});

export const OrdersListScreen = connect(mapStateToProps, mapDispatchToProps)(OrdersListScreenImpl);

type OrderRowProps = {
  order: App.Api.Order;
  onPress: (order: App.Api.Order) => void;
  onDownPress: (order: App.Api.Order) => void;
  isStatusUpdating: boolean;
};

const OrderRow = ({ order, onPress, onDownPress, isStatusUpdating }: OrderRowProps) => {
  const canPushStatusToDownwards = orderUtils.canOrderStatusChangeFromList(
    order.attributes.status_id
  );
  return (
    <View className="bg-sky-800 border-b border-sky-700 flex-row">
      <TouchableOpacity
        onPress={() => {
          onPress(order);
        }}
        className="flex-1 p-3 flex-row"
        activeOpacity={0.8}>
        <MaterialIcons
          name={order.attributes.order_type === 'delivery' ? 'delivery-dining' : 'shopping-bag'}
          color="white"
          size={32}
        />
        <View className="flex-col mx-4">
          <Text style={iOSUIKit.subheadEmphasizedWhite}># {order.attributes.order_id}</Text>
          <Text style={iOSUIKit.subheadEmphasizedWhite}>
            {`${order.attributes.order_time}`.substring(0, 5)}
          </Text>
        </View>
        <View className="flex-1">
          <Text style={iOSUIKit.bodyWhite}>
            {`${order.attributes.first_name} ${order.attributes.last_name}`}
          </Text>
          <Text style={iOSUIKit.caption2White}>{order.attributes.telephone}</Text>
        </View>
      </TouchableOpacity>
      {canPushStatusToDownwards && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onDownPress(order);
          }}
          className="flex-row items-center bg-sky-900 px-6">
          {isStatusUpdating ? (
            <ActivityIndicator color="white" />
          ) : (
            <MaterialIcons name="arrow-downward" color="white" size={18} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const SearchBar = ({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) => {
  const [datepickerOpen, setDatePickerOpen] = useState(false);
  const today = selectedDate ? isToday(selectedDate) : false;

  return (
    <View className=" pt-2 px-3 flex-row items-center">
      <TouchableOpacity
        onPress={() => {
          setDatePickerOpen(!datepickerOpen);
        }}
        activeOpacity={0.9}
        className="py-2 rounded-full px-6 flex-1 bg-sky-700 text-white font-semibold">
        <Text className="text-white text-lg font-sans" weight="semibold">
          {today ? 'Orders Today' : `${dateUtils.formatDate(selectedDate)}`}
        </Text>
      </TouchableOpacity>
      {!today && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            onDateSelect(new Date());
          }}
          className="px-4 mx-2 bg-sky-800 py-3 rounded-full ml-4 -mr-1">
          <Text className="text-white text-center">today</Text>
        </TouchableOpacity>
      )}
      <DateTimePickerModal
        isVisible={datepickerOpen}
        mode="date"
        date={selectedDate}
        maximumDate={addDays(new Date(), 10)} // 10 days in the future
        onConfirm={(date) => {
          setDatePickerOpen(false);
          onDateSelect(date);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </View>
  );
};
