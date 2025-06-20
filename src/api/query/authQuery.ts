import { TPromiseResponse } from '@/lib/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

export const login = async (payload: TLoginPayload): TLoginResponse => {
  const { type, ...rest } = payload;
  const url = apiUrl.login(type);
  const response = await axiosInstance.post(url, rest);
  return response?.data;
};

// types
type TLoginPayload = { id: string; password: string; type: string };
type TLoginResponse = TPromiseResponse<{ accessToken: string }>;
