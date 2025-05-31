import { TPromiseResponse, TTerm } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const addTerm = async (payload: TAddTermPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addTerm, payload);
  return response.data;
};

type TAddTermPayload = Pick<TTerm, 'name'>;
