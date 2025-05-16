import { apiUrl } from '../apiUrl';
import { removeEmptyProperties } from '@/helpers';
import { axiosInstance } from '../axiosInstance';
import { TAdmin, TPromiseResponse, USER_ROLE } from '@/lib/types';

export const createAdmin = async (payload: TCreateAdminPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.createAdmin, payload);
  return response.data;
};

export const getAdmins = async (query: TGetAdminArgs): TPromiseResponse<TGetAdminQueryResult> => {
  const refinedArgs = removeEmptyProperties(query);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const response = await axiosInstance.get(apiUrl.getAdmins(searchParams ? `?${searchParams}` : ''));
  return response.data;
};

// types
type TCreateAdminPayload = { name: string; email: string; role: USER_ROLE };
type TGetAdminArgs = { searchTerm?: string; role?: string };
export type TGetAdminQueryResult = Pick<TAdmin, 'id' | 'name' | 'role'>[];
