import { apiUrl } from '../apiUrl';
import { removeEmptyProperties } from '@/helpers';
import { axiosInstance } from '../axiosInstance';
import { TAdmin, TPromiseResponse } from '@/lib/types';

export const createAdmin = () => {};

export const getAdmins = async (query: TGetAdminArgs): TPromiseResponse<TGetAdminQueryResult> => {
  const refinedArgs = removeEmptyProperties(query);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const response = await axiosInstance.get(apiUrl.getAdmins(searchParams ? `?${searchParams}` : ''));
  return response.data;
};

// types
type TGetAdminArgs = { searchTerm?: string; role?: string };
export type TGetAdminQueryResult = Pick<TAdmin, 'id' | 'name' | 'role'>[];
