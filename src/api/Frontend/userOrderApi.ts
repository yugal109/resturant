import { api } from '../axios';

export const userOrderApi = async () => {
  const response = await api.get<App.FrontApi.UserOrderInterface>('/orders', {});
  return response.data;
};

export const userOneOrderApi = async (id: string) => {
  const response = await api.get<App.FrontApi.UserOneOrderInterface>(`/orders/${id}`, {});
  return response.data;
};
