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

type TAddTermPayload = Pick<TTerm, 'name'>;
type TGetTermsResponse = Pick<TTerm, 'id' | 'name' | 'status' | 'year'>[];
