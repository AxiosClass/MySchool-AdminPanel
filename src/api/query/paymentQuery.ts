import { TClassroom, TObject, TPayment, TPromiseResponse, TStudent, USER_STATUS } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams, removeEmptyProperties } from '@/helpers';

export const getPayments = async (args: TObject = {}): TPromiseResponse<TGetPaymentResponse[]> => {
  const response = await axiosInstance.get(apiUrl.getPayments(makeUrlParams(args)));
  return response?.data;
};

export const getPaymentSummary = async (studentId: string): TPromiseResponse<TGetPaymentSummaryResponse> => {
  const response = await axiosInstance.get(apiUrl.getPaymentSummary(studentId));
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

export type TGetPaymentSummaryResponse = Pick<TStudent, 'id' | 'name' | 'class' | 'guardian'> & {
  classroom: Pick<TClassroom, 'id' | 'name'>;
  status: USER_STATUS;
  totalPaid: number;
  totalDue: number;
};

type TMakePayment = Pick<TPayment, 'amount' | 'description' | 'type' | 'month' | 'year' | 'studentId' | 'classId'>;
