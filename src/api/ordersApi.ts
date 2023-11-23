import { format } from 'date-fns';

import { dateUtils } from '../utils';
import { ORDER_STATUS_MAP } from '../utils/orderUtils';
import { api } from './axios';

export async function getOrders(startAt: Date, endAt: Date, locationId: string, statusId?: number) {
  const formatStr = 'yyyy-MM-dd HH:mm:ss';

  const startDate = format(startAt, formatStr);
  const endDate = format(endAt, formatStr);

  const params: any = {
    'dateTimeFilter[orderDateTime.startAt]': startDate,
    'dateTimeFilter[orderDateTime.endAt]': endDate,
    location: locationId,
    sort: 'created_at desc',
  };

  if (statusId !== undefined) {
    params.status = statusId;
  }

  const resposne = await api.get<App.Api.Pagination<App.Api.Order>>(`/orders`, {
    params,
  });

  return resposne.data;
}

export async function getOrdersSince(locationId: string, since: Date) {
  const resposne = await api.get<App.Api.Pagination<App.Api.Order>>('/orders', {
    params: { orders_since: since.toISOString(), location: locationId, sort: 'created_at desc' },
  });

  return resposne.data;
}

export async function getOrderDetail(orderId: string) {
  const resposne = await api.get<{ data: App.Api.Order }>(`/orders/${orderId}`);

  return resposne.data.data;
}

export async function confirmOrder(orderId: string, acceptedTime: Date, statusId: string) {
  const resposne = await api.patch<{ data: App.Api.Order }>(`/orders/${orderId}`, {
    status_id: statusId,
    order_time: dateUtils.formattedTime(acceptedTime),
  });

  return resposne.data.data;
}

export async function updateOrderStatus(orderId: string, status: keyof typeof ORDER_STATUS_MAP) {
  const statusId = ORDER_STATUS_MAP[status];
  return updateOrderStatusWithId(orderId, statusId);
}

export async function updateOrderStatusWithId(orderId: string, statusId: string) {
  const resposne = await api.patch<{ data: App.Api.Order }>(`/orders/${orderId}`, {
    status_id: statusId,
  });

  return resposne.data.data;
}
