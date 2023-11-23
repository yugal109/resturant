import { api } from '../axios';

export const profilePageApi = async () => {
  const response = await api.get<App.FrontApi.ProfileData>('/eatonline/profile', {});
  return response.data;
};
