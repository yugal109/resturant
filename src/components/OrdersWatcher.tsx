import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import sortBy from 'lodash/sortBy';
import React, { useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { ordersApi } from '../api';
import { actions, AppDispatch, RootState } from '../store';
import { dateUtils, logger } from '../utils';
import { OrdersModalContent } from './OrdersModalContent';

type TProps = {
  children: React.ReactNode;
} & ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

type TState = {
  timer?: TimerHandler;
  modalVisible: boolean;
  appState: AppStateStatus;
};

const AnimatedIcon = Animatable.createAnimatableComponent<{
  name: string;
  style?: any;
  size: number;
  color: string;
}>(MaterialCommunityIcons);

const TIMER_INTERVAL = 10 * 1000; // 10 Seconds

class OrdersWatcherImplementation extends React.Component<TProps, TState> {
  state: TState = {
    modalVisible: false,
    appState: AppState.currentState,
  };

  timerHandler?: NodeJS.Timer;
  appStatusSubscription?: NativeEventSubscription;

  componentDidMount() {
    this.startTimer();
    this.observeAppStatus();
  }

  observeAppStatus = () => {
    this.appStatusSubscription = AppState.addEventListener('change', (nextAppState) => {
      const prevAppState = this.state.appState;
      if (`${prevAppState}`.match(/inactive|background/) && nextAppState === 'active') {
        this.startTimer();
      }

      if (nextAppState.match(/inactive|background/)) {
        this.clearTimer();
      }
      this.setState({ appState: nextAppState });
    });
  };

  startTimer = () => {
    if (this.timerHandler) {
      this.clearTimer();
    }

    logger.logInfo('interval started');

    this.timerHandler = setInterval(this.onTimerRun, TIMER_INTERVAL);
  };

  resetTimer = () => {
    this.clearTimer();
    this.startTimer();
  };

  clearTimer = () => {
    if (this.timerHandler) {
      clearInterval(this.timerHandler);
      this.timerHandler = undefined;
      logger.logInfo('interval cleared');
    }
  };

  onTimerRun = () => {
    const { locationId, ordersById, newOrdersCheckedAt } = this.props;
    if (!locationId) return;

    const sortedOrders = ordersById
      ? sortBy(Object.values(ordersById), (i) => i?.attributes.created_at)
      : [];
    const lastOrder = sortedOrders.length ? sortedOrders?.[sortedOrders.length - 1] : undefined;

    // Orders Since: If no orders in orders list, pick the beginning of the day
    // if there are orders on the day, pick the time of the latest order
    const ordersSince = newOrdersCheckedAt
      ? new Date(newOrdersCheckedAt)
      : lastOrder
      ? new Date(lastOrder.attributes.created_at)
      : dateUtils.startOfDay(new Date());

    logger.logInfo('Orders Checked', lastOrder, ordersSince.toISOString());

    const checkedAt = new Date();
    ordersApi
      .getOrdersSince(locationId, ordersSince)
      .then((newOrders) => {
        if (newOrders.data.length) {
          this.props.addNewOrders(newOrders.data, checkedAt);
          this.setState({ modalVisible: true });
        } else {
          this.props.setNewOrdersCheckedAt(checkedAt);
        }
      })
      .catch(() => {})
      .finally(() => {
        this.resetTimer();
      });
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const { newOrders, ordersById } = this.props;

    const oldestNewOrder = newOrders.length > 0 ? ordersById[newOrders[0]] : undefined;

    const shouldShowButton = newOrders.length > 0;

    return (
      <View className="flex-1">
        {this.props.children}
        {shouldShowButton && (
          <OrdersAlertButton
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          />
        )}
        <Modal
          transparent
          visible={this.state.modalVisible && !!oldestNewOrder}
          animationType="fade">
          {!!oldestNewOrder && (
            <OrdersModalContent
              order={oldestNewOrder}
              onClose={() => {
                this.setState({ modalVisible: false });
              }}
            />
          )}
        </Modal>
      </View>
    );
  }
}

const OrdersAlertButton = ({ onPress }: { onPress: () => void }) => {
  const { bottom, right } = useSafeAreaInsets();
  const [isNoSound, setIsNoSound] = useState(false); // No sound in dev

  React.useEffect(() => {
    let soundResource: Audio.Sound | undefined = undefined;
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/order-alert.mp3'));
      sound.setIsLoopingAsync(true);
      sound.playAsync();
      soundResource = sound;
      logger.logInfo('order alert started playing');
    };

    if (!isNoSound) {
      playSound();
    }

    return () => {
      soundResource?.stopAsync();
      soundResource?.unloadAsync();
      logger.logInfo('order sound resource cleared');
    };
  }, [isNoSound]);

  const iconName = isNoSound ? 'bell-remove' : ('bell-badge' as any);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      onLongPress={() => {
        setIsNoSound(!isNoSound);
      }}
      style={{ bottom: bottom + 16, right: right + 16, position: 'absolute' }}
      className="absolute  h-16 w-16 border-red-600 border-2 shadow rounded-full bg-red-600 items-center justify-center flex-row">
      <AnimatedIcon
        animation="tada"
        easing="ease-in-out-quart"
        duration={3000}
        delay={1000}
        iterationCount="infinite"
        name={iconName}
        size={32}
        color="white"
      />
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addNewOrders: (newOrders: App.Api.Order[], checkedAt: Date) => {
    dispatch(
      actions.ordersActions.addNewOrders({ orders: newOrders, checkedAt: checkedAt.getTime() })
    );
  },
  setNewOrdersCheckedAt: (date: Date) => {
    dispatch(actions.ordersActions.setNewOrdersCheckedTime(date.getTime()));
  },
});

const mapStateToProps = (state: RootState) => ({
  newOrders: state.orders.newOrderIds,
  ordersById: state.orders.ordersById,
  newOrdersCheckedAt: state.orders.newOrdersCheckedAt,
  locationId: state.auth.activeLocation?.id,
});

export const OrdersWatcher = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersWatcherImplementation);
