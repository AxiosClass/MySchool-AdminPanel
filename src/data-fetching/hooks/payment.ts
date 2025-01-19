import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { USER_STATUS } from '@/types/userType';
import { axiosInstance } from '../axiosInstance';
import { IServerResponse, PAYMENT_TYPES } from '@/types/commonType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { makeQueryUrl, removeEmptyProperties } from '@/helpers/helpers';
import { queryClient } from '../QueryProvider';

// payment summary
export interface IPaymentSummary {
  id: string;
  name: string;
  class: string;
  classroom: { id: string; name: string };
  guardian: { name: string; phone: string; relation: string };
  status: USER_STATUS;
  totalPaid: number;
  totalDue: number;
}

const getPaymentSummary = async (studentId: string): Promise<IServerResponse<IPaymentSummary>> => {
  const response = await axiosInstance.get(apiUrl.getPaymentSummary(studentId));
  return response?.data;
};

export const useGetPaymentSummary = (studentId: string) => {
  return useQuery({
    queryFn: () => getPaymentSummary(studentId),
    queryKey: [TAGS.PAYMENT_DETAILS, { studentId }],
    enabled: !!studentId,
    staleTime: Infinity,
  });
};

// make payment
interface IMakePaymentPayload {
  amount: number;
  month?: number;
  year: number;
  description?: string;
  type: string;
  studentId: string;
}

const makePayment = async (payload: IMakePaymentPayload): Promise<IServerResponse<null>> => {
  const refinedProperties = removeEmptyProperties(payload);
  const response = await axiosInstance.post(apiUrl.makePayment, refinedProperties);
  return response?.data;
};

export const useMakePaymentMutation = (studentId: string) => {
  const makePaymentMutation = useMutation({
    mutationFn: makePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.PAYMENTS] });
      queryClient.invalidateQueries({ queryKey: [TAGS.PAYMENT_DETAILS, { studentId }] });
    },
  });

  return { makePaymentMutation, isLoading: makePaymentMutation.isPending };
};

// get payments

export interface IGetPayment {
  id: string;
  student: { id: string; name: string; class: string; classroom: { name: string } };
  amount: number;
  description: string;
  month: number;
  year: number;
  type: PAYMENT_TYPES;
  createdAt: Date;
}

const getPayments = async (args: Record<string, any>): Promise<IServerResponse<IGetPayment[]>> => {
  const url = makeQueryUrl(apiUrl.getPayments, args);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const useGetPaymentsQuery = (args: Record<string, any>) => {
  return useQuery({
    queryFn: () => getPayments(args),
    queryKey: [TAGS.PAYMENTS, { ...args }],
    staleTime: Infinity,
  });
};
