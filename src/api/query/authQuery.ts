import { TPromiseResponse } from '@/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

export const login = async (payload: TLoginPayload): TLoginResponse => {
  const { data } = await axiosInstance.post(apiUrl.login, payload);
  return data;
};

// types
type TLoginPayload = { id: string; password: string };
type TLoginResponse = TPromiseResponse<{ accessToken: string }>;
