import { TClassroom, TPayment, TPromiseResponse, TStudent, USER_STATUS } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const getPayments = async (): TPromiseResponse<TGetPaymentResponse[]> => {
  const response = await axiosInstance.get(apiUrl.getPayments);
  return response?.data;
};

export const getPaymentSummary = async (studentId: string): TPromiseResponse<TGetPaymentSummaryResponse> => {
  const response = await axiosInstance.get(apiUrl.getPaymentSummary(studentId));
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
