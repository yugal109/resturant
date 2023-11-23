import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { connect } from 'react-redux';

import { ScreenParamsList } from '../Navigation';
import { ordersApi } from '../api';
import { OrderDetailView } from '../components/OrderDetailView';
import { SECONDARY_COLOR } from '../config';
import { actions, AppDispatch, RootState } from '../store';

type TProps = NativeStackScreenProps<ScreenParamsList, 'OrderDetailScreen'> &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

type TState = {
  isFetching: boolean;
};

class OrderDetailScreenImpl extends React.Component<TProps, TState> {
  state: TState = {
    isFetching: false,
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const orderId = this.props.route.params?.orderId;

    this.setState({ isFetching: true });
    const order = await ordersApi.getOrderDetail(orderId);
    this.props.navigation.setOptions({ headerTitle: `# ${orderId}` });

    if (order) {
      this.props.updateOrder(order);
    } else {
      // return back with error?
    }
    this.setState({ isFetching: false });
  };

  render() {
    const { order } = this.props;

    if (!order)
      return (
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: SECONDARY_COLOR }}>
          <ActivityIndicator />
        </View>
      );

    return (
      <SafeAreaView className="flex-1">
        <OrderDetailView order={order} isDetailPage />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: NativeStackScreenProps<ScreenParamsList, 'OrderDetailScreen'>
) => ({
  order: state.orders.ordersById[ownProps.route.params.orderId],
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateOrder: (order: App.Api.Order) => {
    dispatch(actions.ordersActions.updateOrder(order));
  },
});

export const OrderDetailScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailScreenImpl);
