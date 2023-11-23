import { api } from '../axios';

export const reviewsApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};
