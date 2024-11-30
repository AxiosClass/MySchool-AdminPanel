import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { USER_STATUS } from '@/types/user';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

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
    queryKey: [TAGS.PAYMENT_DETAILS, studentId],
    enabled: !!studentId,
  });
};
