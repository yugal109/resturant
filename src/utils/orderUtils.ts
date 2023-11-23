import { MaterialCommunityIcons } from '@expo/vector-icons';
import { groupBy } from 'lodash';
import { ComponentProps } from 'react';

export const ORDER_STATUS_MAP = {
  RECEIVED: '1', // initial status
  PENDING: '2', //  order is accepted
  PREPARATION: '3', // in kitchen
  DELIVERY: '4', // order dispatched ofr delivery
  COMPLETED: '5', // when everything is finished
  TABLE_RESERVATION_CONFIRMED: '6',
  TABLE_RESERVATION_CANCELED: '7',
  TABLE_RESERVATION_PENDING: '8',
  CANCELED: '9', // order is canceled
} as const;

const ORDER_STATUS_BY_ORDER: string[] = [
  ORDER_STATUS_MAP.RECEIVED,
  ORDER_STATUS_MAP.PENDING,
  ORDER_STATUS_MAP.PREPARATION,
  ORDER_STATUS_MAP.DELIVERY,
  ORDER_STATUS_MAP.COMPLETED,
  ORDER_STATUS_MAP.TABLE_RESERVATION_CONFIRMED,
  ORDER_STATUS_MAP.TABLE_RESERVATION_CANCELED,
  ORDER_STATUS_MAP.TABLE_RESERVATION_PENDING,
  ORDER_STATUS_MAP.CANCELED,
];

export type OrderGroup = {
  statusId: string;
  title: string;
  emptyMessage: string;
  visibleWhenEmpty?: boolean;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  data?: App.Api.Order[];
  isFuture?: boolean;
};

export function paymentCodeToText(payment: 'cod' | 'card' | 'mollie_merchant_specific' | string) {
  return payment === 'cod'
    ? 'Bestelling is nog niet betaald'
    : payment === 'card' || payment === 'mollie_merchant_specific'
    ? 'Betaald Online'
    : `Unknown (${payment})`;
}

export function formatAmount(amount: number, currency: string) {
  return Intl.NumberFormat('nl-BE', { currency, style: 'currency' }).format(amount);
}

export function formatNumber(amount: number) {
  return Intl.NumberFormat('nl-BE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    amount
  );
}

export function orderStatusIdToLabel(statusId: string, orderType: App.Api.OrderType) {
  switch (statusId) {
    case ORDER_STATUS_MAP.RECEIVED:
      return 'Received';
    case ORDER_STATUS_MAP.PENDING:
      return 'Accepted';
    case ORDER_STATUS_MAP.PREPARATION:
      return 'Kitchen';
    case ORDER_STATUS_MAP.DELIVERY:
      return orderType.toLocaleLowerCase() === 'delivery' ? 'Delivery' : 'Pickup';
    case ORDER_STATUS_MAP.COMPLETED:
      return 'Completed';
    case ORDER_STATUS_MAP.CANCELED:
      return 'Canceled';
    default:
      return 'Unknown';
  }
}

export function orderStatusIdToIcon(
  statusId: string,
  orderType: App.Api.OrderType
): ComponentProps<typeof MaterialCommunityIcons>['name'] {
  switch (statusId) {
    case ORDER_STATUS_MAP.RECEIVED:
      return 'food';
    case ORDER_STATUS_MAP.PENDING:
      return 'food';
    case ORDER_STATUS_MAP.PREPARATION:
      return 'food-turkey';
    case ORDER_STATUS_MAP.DELIVERY:
      return orderType.toLocaleLowerCase() === 'delivery' ? 'bike-fast' : 'basket-check';
    case ORDER_STATUS_MAP.COMPLETED:
      return 'check-circle';
    case ORDER_STATUS_MAP.CANCELED:
      return 'cancel';
    default:
      return 'list-status';
  }
}

export function canOrderStatusChangeFromList(statusId: number | string) {
  const currentStatusIndex = ORDER_STATUS_BY_ORDER.indexOf(`${statusId}`);
  return currentStatusIndex < ORDER_STATUS_BY_ORDER.indexOf(ORDER_STATUS_MAP.COMPLETED);
}

export function getNextStatusIdToChangeFromList(statusId: number | string) {
  const currentStatusIndex = ORDER_STATUS_BY_ORDER.indexOf(`${statusId}`);
  return ORDER_STATUS_BY_ORDER[currentStatusIndex + 1];
}

export function groupOrdersByOrderStatus(orders: App.Api.Order[], futureOrders?: App.Api.Order[]) {
  const groupedOrders = groupBy(orders, (o) => o.attributes.status_id);

  const groups: OrderGroup[] = [
    {
      statusId: ORDER_STATUS_MAP.PENDING,
      title: 'New Orders',
      emptyMessage: 'New accepted orders',
      icon: 'food',
    },
    {
      statusId: ORDER_STATUS_MAP.PREPARATION,
      title: 'Kitchen',
      emptyMessage: 'Move the orders to this section when the kitchen starts preparing them',
      icon: 'food-turkey',
    },
    {
      statusId: ORDER_STATUS_MAP.DELIVERY,
      title: 'Pickup Ready / On the way',
      emptyMessage:
        'Move the orders to this section when the orders are ready for pickup or are being deliverd',
      icon: 'bike-fast',
    },
    {
      statusId: ORDER_STATUS_MAP.COMPLETED,
      title: 'Completed',
      emptyMessage: 'Move the orders here when they are delivered or picked up',
      icon: 'home-map-marker',
    },
  ];

  const groupedData = groups.map((group) => {
    group.data = groupedOrders[group.statusId] || [];
    return group;
  });

  if (futureOrders && futureOrders.length) {
    groupedData.push({
      statusId: 'future',
      title: 'Future Orders',
      emptyMessage: 'Orders in the future',
      icon: 'home-map-marker',
      data: futureOrders,
      isFuture: true,
    });
  }

  return groupedData;
}
