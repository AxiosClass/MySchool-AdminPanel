import { TObject, TPromiseResponse, TTerm } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams } from '@/helpers';

export const addTerm = async (payload: TAddTermPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addTerm, payload);
  return response.data;
};

export const getTerms = async (args: TObject): TPromiseResponse<TGetTermsResponse> => {
  const searchParams = makeUrlParams(args);
  const response = await axiosInstance.get(apiUrl.getTerms(searchParams));
  return response.data;
};

export const updateTerm = async ({ id, ...payload }: TUpdateTermPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.updateTerm(id), payload);
  return response.data;
};

type TAddTermPayload = Pick<TTerm, 'name'>;
type TGetTermsResponse = Pick<TTerm, 'id' | 'name' | 'status' | 'year'>[];
type TUpdateTermPayload = Pick<TTerm, 'id' | 'name'>;
