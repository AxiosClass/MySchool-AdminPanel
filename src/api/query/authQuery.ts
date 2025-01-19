import { TServerResponse } from '@/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

type TLoginPayload = { id: string; password: string };
type TLoginResponse = Promise<TServerResponse<{ accessToken: string }>>;
export const login = async (payload: TLoginPayload): TLoginResponse => {
  const { data } = await axiosInstance.post(apiUrl.login, payload);
  return data;
};
