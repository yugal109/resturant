import Axios, { AxiosError } from 'axios';

import { BASE_URL, SHOULD_LOG_NETWORK } from '../config';
import loginService from '../services/loginService';
import { logger } from '../utils';

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await loginService.getAuthToken().catch(() => null);
  if (accessToken && config.baseURL?.startsWith(BASE_URL)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (success) => {
    if (SHOULD_LOG_NETWORK) {
      // logger.logSuccess(success);
    }

    return Promise.resolve(success);
  },
  (error: AxiosError & { error?: unknown }) => {
    if (SHOULD_LOG_NETWORK) {
      // logger.logError(error.response?.data, error.config);
    }

    error.error = error.response?.data || (error.message ? { message: error.message } : undefined);

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance as api };
