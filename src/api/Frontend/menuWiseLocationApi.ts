import data from '../../data/location.json';
import { Location, MenuWiseLocationInterface } from '../apiTypes';

export const menuWiseLocationApi = (index: number): Promise<MenuWiseLocationInterface[]> => {
  // fetch api here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (index === 1) {
        resolve(data.data.slice(0, 10));
      } else if (index === 2) {
        resolve(data.data.slice(30, 40));
      } else {
        resolve(data.data.slice(60, 75));
      }
    }, 500);
  });
};
