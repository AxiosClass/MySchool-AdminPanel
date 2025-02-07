import { TClassroom, TPayment, TPromiseResponse, TStudent } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const getPayments = async (): TPromiseResponse<TGetPaymentResponse[]> => {
  const response = await axiosInstance.get(apiUrl.getPayments);
  return response?.data;
};

// types
export type TGetPaymentResponse = Pick<
  TPayment,
  'id' | 'amount' | 'description' | 'month' | 'year' | 'type' | 'createdAt'
> & {
  student: Pick<TStudent, 'id' | 'name' | 'class'> & { classroom: Pick<TClassroom, 'name'> };
};
