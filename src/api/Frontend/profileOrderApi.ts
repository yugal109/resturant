import axios from 'axios';

import { ResturantProfilePageTopInterface } from './apiTypes/baseFrontEndApiType';
import loc from '../../data/location.json';
import data from '../../data/oneLocation.json';
import { logInfo } from '../../utils/logger';
import { api } from '../axios';

export const restaurantPageTopApi = async () => {
  const response = await api.get<App.FrontApi.ResturantProfilePageTopInterface>('/locations/1', {});
  // console.log(response.data);
  return response.data;
};

export const profileMenuApi = async () => {
  const response = await api.get<App.FrontApi.RestaurantProfileMenuInterface>(
    '/menus?locations=1&page=1&pageLimit=5',
    {}
  );
  logInfo(response.data.data[0].attributes);
  // console.log(response.data);
  return response.data;
};

export const restaurantPageMenuWiseItemsApi = (index: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(loc.data.slice(index * 10, (index + 1) * 10));
    }, 2000);
  });
};
