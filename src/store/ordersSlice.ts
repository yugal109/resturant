import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isFuture, isToday } from 'date-fns';

import { dateUtils } from '../utils';
import { ORDER_STATUS_MAP } from '../utils/orderUtils';

type TAuthState = {
  ordersById: { [key: string]: App.Api.Order | undefined };
  futureOrderIds: string[];
  newOrderIds: string[];
  newOrdersCheckedAt?: number;
  orderIdsByDate: { [key: string]: string[] }; // orderId
};

function mapOrdersWithId(orders: App.Api.Order[]) {
  return orders.reduce((all, current) => {
    all[current.id] = current;
    return all;
  }, {} as { [key: string]: App.Api.Order });
}

// new orders are the one with status RECEIVED:
function extractNewOrders(orders: { [key: string]: App.Api.Order | undefined }) {
  return Object.keys(orders).filter(
    (orderId) => `${orders[orderId]?.attributes.status_id}` === ORDER_STATUS_MAP.RECEIVED
  );
}

function extractFutureOrderIds(orders: { [key: string]: App.Api.Order | undefined }) {
  return Object.keys(orders).filter((orderId) => {
    const order = orders[orderId];
    if (order) {
      const orderDate = dateUtils.parseOrderDate(order.attributes.order_date_time);
      return !isToday(orderDate) && isFuture(orderDate);
    }
    return false;
  });
}

function addOrdersToState(state: TAuthState, orders: App.Api.Order[]) {
  const ordersMap = mapOrdersWithId(orders);
  state.ordersById = { ...state.ordersById, ...ordersMap };

  state.newOrderIds = extractNewOrders(state.ordersById);
  state.futureOrderIds = extractFutureOrderIds(state.ordersById);

  // if the order is not present is the given day's order list, add it!
  Object.keys(ordersMap).forEach((orderId) => {
    const order = ordersMap[orderId];
    const orderDate = dateUtils.formatDate(order.attributes.order_date_time);

    if (!state.orderIdsByDate[orderDate]) {
      state.orderIdsByDate[orderDate] = [];
    }

    if (!state.orderIdsByDate[orderDate].includes(orderId)) {
      // add this order to the beginning of list
      state.orderIdsByDate[orderDate].unshift(orderId);
    }
  });
}

const initialState: TAuthState = {
  ordersById: {},
  newOrderIds: [],
  futureOrderIds: [],
  orderIdsByDate: {},
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addNewOrders: (
      state,
      action: PayloadAction<{ orders: App.Api.Order[]; checkedAt?: number }>
    ) => {
      addOrdersToState(state, action.payload.orders);
      if (action.payload.checkedAt) {
        state.newOrdersCheckedAt = action.payload.checkedAt;
      }
    },
    setNewOrdersCheckedTime: (state, action: PayloadAction<number>) => {
      state.newOrdersCheckedAt = action.payload;
    },
    setOrdersOnDate: (
      state,
      action: PayloadAction<{ date: string; orders: App.Api.Pagination<App.Api.Order> }>
    ) => {
      addOrdersToState(state, action.payload.orders.data);
    },
    addOrders: (state, action: PayloadAction<App.Api.Pagination<App.Api.Order>>) => {
      addOrdersToState(state, action.payload.data);
    },
    updateOrder: (state, action: PayloadAction<App.Api.Order>) => {
      addOrdersToState(state, [action.payload]);
    },
    clearOrders: (state) => {
      state.newOrderIds = initialState.newOrderIds;
      state.newOrdersCheckedAt = initialState.newOrdersCheckedAt;
      state.orderIdsByDate = initialState.orderIdsByDate;
      state.ordersById = initialState.ordersById;
      state.futureOrderIds = initialState.futureOrderIds;
    },
  },
});

export default ordersSlice;
