import { api } from '../axios';

export const fetchMenuItemsApi = async () => {
  const response = await api.get('/menus');
  const res = await api.get('/locations');
  return { menu_response: response.data, location_response: res.data };
};
