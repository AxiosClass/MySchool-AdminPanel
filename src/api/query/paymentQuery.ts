import { apiUrl } from '../apiUrl';
import { TObject, TPayment, TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams, removeEmptyProperties } from '@/helpers';

export const getPayments = async (args: TObject = {}): TPromiseResponse<TGetPaymentResult> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getPayments(queryString);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const makePayment = async (payload: TMakePaymentPayload): TPromiseResponse => {
  const refinedPayload = removeEmptyProperties(payload);
  const response = await axiosInstance.post(apiUrl.makePayment, refinedPayload);
  return response?.data;
};

// types
export type TGetPaymentResult = Array<
  Pick<TPayment, 'id' | 'amount' | 'description' | 'month' | 'year' | 'type' | 'createdAt'> & {
    studentId: string;
    studentName: string;
    studentClass: string;
    studentClassroomName: string;
  }
>;

type TMakePaymentPayload = Pick<
  TPayment,
  'amount' | 'description' | 'type' | 'month' | 'year' | 'studentId' | 'classId'
>;
