import axios from 'axios';

import { getAccessTokenFormLocal } from '@/helpers/tokenHelper';
import { SERVER_ADDRESS } from './apiUrl';

export const axiosInstance = axios.create({
  baseURL: SERVER_ADDRESS,
  headers: {
    ['Content-Type']: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFormLocal();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
