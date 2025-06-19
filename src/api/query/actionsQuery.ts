import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const giveDiscount = async (payload: TGiveDiscountPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.giveDiscount, payload);
  return response.data;
};

export const promoteStudent = async (payload: TPromoteStudentPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.promoteStudent, payload);
  return response.data;
};

type TGiveDiscountPayload = { amount: number; description?: string; studentId: string };
type TPromoteStudentPayload = { studentId: string; classLevel: string; classroomId: string };
