import { TPromiseResponse } from '@/lib/types';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';

export const giveDiscount = async (payload: TGiveDiscountPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.giveDiscount, payload);
  return response.data;
};

type TGiveDiscountPayload = { amount: number; description?: string; studentId: string };
