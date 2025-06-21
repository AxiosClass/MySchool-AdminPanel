import { TPromiseResponse, USER_ROLE } from '@/lib/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

export const login = async (payload: TLoginPayload): TPromiseResponse<{ accessToken: string }> => {
  const { type, ...rest } = payload;
  const url = apiUrl.login(type);
  const response = await axiosInstance.post(url, rest);
  return response?.data;
};

export const changePassword = async (payload: TChangePasswordPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.changePassword, payload);
  return response.data;
};

export const resetPassword = async (payload: TResetPasswordPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.resetPassword, payload);
  return response.data;
};

// types
type TLoginPayload = { id: string; password: string; type: string };
type TChangePasswordPayload = { currentPassword: string; newPassword: string };
type TResetPasswordPayload = { userId: string; role: USER_ROLE };
