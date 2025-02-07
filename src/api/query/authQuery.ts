import { TPromiseResponse } from '@/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

export const login = async (payload: TLoginPayload): TLoginResponse => {
  const response = await axiosInstance.post(apiUrl.login, payload);
  return response?.data;
};
// types
type TLoginPayload = { id: string; password: string };
type TLoginResponse = TPromiseResponse<{ accessToken: string }>;
