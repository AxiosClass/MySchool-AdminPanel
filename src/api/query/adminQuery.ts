import { apiUrl } from '../apiUrl';
import { makeUrlParams } from '@/helpers';
import { axiosInstance } from '../axiosInstance';
import { TAdmin, TPromiseResponse, USER_ROLE } from '@/lib/types';

export const createAdmin = async (payload: TCreateAdminPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createAdmin, payload);
  return response.data;
};

export const getAdmins = async (args: TGetAdminArgs): TPromiseResponse<TGetAdminQueryResult> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getAdmins(queryString);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const deleteAdmin = async (email: string): TPromiseResponse => {
  const url = apiUrl.deleteAdmin(email);
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const resetAdminPassword = async (email: string): TPromiseResponse => {
  const url = apiUrl.resetPasswordAdmin(email);
  const response = await axiosInstance.patch(url);
  return response.data;
};

// types
type TCreateAdminPayload = { name: string; email: string; role: USER_ROLE };
type TGetAdminArgs = { searchTerm?: string; role?: string };
export type TGetAdminQueryResult = Pick<TAdmin, 'id' | 'name' | 'role'>[];
