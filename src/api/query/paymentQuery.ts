import { TClassroom, TObject, TPayment, TPromiseResponse, TStudent } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams, removeEmptyProperties } from '@/helpers';

export const getPayments = async (args: TObject = {}): TPromiseResponse<TGetPaymentResponse[]> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getPayments(queryString);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const makePayment = async (payload: TMakePayment): TPromiseResponse => {
  const refinedPayload = removeEmptyProperties(payload);
  const response = await axiosInstance.post(apiUrl.makePayment, refinedPayload);
  return response?.data;
};

// types
export type TGetPaymentResponse = Pick<
  TPayment,
  'id' | 'amount' | 'description' | 'month' | 'year' | 'type' | 'createdAt'
> & {
  student: Pick<TStudent, 'id' | 'name' | 'class'> & { classroom: Pick<TClassroom, 'name'> };
};

type TMakePayment = Pick<TPayment, 'amount' | 'description' | 'type' | 'month' | 'year' | 'studentId' | 'classId'>;
