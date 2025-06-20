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
  const url = apiUrl.getTerms(searchParams);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateTerm = async ({ id, ...payload }: TUpdateTermPayload): TPromiseResponse => {
  const url = apiUrl.updateTerm(id);
  const response = await axiosInstance.patch(url, payload);
  return response.data;
};

export const updateTermStatus = async ({ id, status }: TUpdateTermStatusPayload): TPromiseResponse => {
  const url = apiUrl.updateTermStatus(id);
  const response = await axiosInstance.patch(url, { status });
  return response.data;
};

export const deleteTerm = async (id: string): TPromiseResponse => {
  const url = apiUrl.deleteTerm(id);
  const response = await axiosInstance.delete(url);
  return response.data;
};

export const getOngoingTerm = async (): TPromiseResponse<TGetOngoingTermResponse> => {
  const response = await axiosInstance.get(apiUrl.getOngoingTerm);
  return response.data;
};

type TAddTermPayload = Pick<TTerm, 'name'>;
type TGetTermsResponse = Pick<TTerm, 'id' | 'name' | 'status' | 'year'>[];
type TUpdateTermPayload = Pick<TTerm, 'id' | 'name'>;
type TUpdateTermStatusPayload = Pick<TTerm, 'id' | 'status'>;
type TGetOngoingTermResponse = Pick<TTerm, 'id' | 'name' | 'year'>;
