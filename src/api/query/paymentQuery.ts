import { TClassroom, TObject, TPayment, TPromiseResponse, TStudent, USER_STATUS } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { removeEmptyProperties } from '@/helpers';

export const getPayments = async (args: TObject = {}): TPromiseResponse<TGetPaymentResponse[]> => {
  const refinedArgs = removeEmptyProperties(args) as TObject;
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const response = await axiosInstance.get(apiUrl.getPayments(searchParams ? `?${searchParams}` : ''));
  return response?.data;
};

export const getPaymentSummary = async (studentId: string): TPromiseResponse<TGetPaymentSummaryResponse> => {
  const response = await axiosInstance.get(apiUrl.getPaymentSummary(studentId));
  return response?.data;
};

export const makePayment = async (payload: TMakePayment): TPromiseResponse<null> => {
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

type TMakePayment = Pick<TPayment, 'amount' | 'description' | 'type' | 'month' | 'year' | 'studentId'>;
