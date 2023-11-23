import favourites from '../../data/favourite.json';
import menu_wise_location from '../../data/location.json';
import { api } from '../axios';

export const favouritesApi = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menu_wise_location.data.slice(95, 100));
    }, 2000);
  });
};

export const favouritesApiReloaded = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(menu_wise_location.data.slice(90, 100));
    }, 2000);
  });
};
