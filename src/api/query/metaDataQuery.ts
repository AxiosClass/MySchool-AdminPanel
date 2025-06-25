import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getOverview = async (): TPromiseResponse<TAttendanceSummary> => {
  const response = await axiosInstance.get(apiUrl.getOverview);
  return response.data;
};

export const getAttendanceTrends = async (): TPromiseResponse<TAttendanceTrend[]> => {
  const response = await axiosInstance.get(apiUrl.getAttendanceTrends);
  return response.data;
};

export const getPaymentTrends = async (): TPromiseResponse<TPaymentTrend[]> => {
  const response = await axiosInstance.get(apiUrl.getPaymentTrends);
  return response.data;
};

type TAttendanceSummary = {
  totalStudent: number;
  totalTeacher: number;
  collection: number;
  currentDue: number;
};

export type TAttendanceTrend = { date: string; count: number };
export type TPaymentTrend = { month: string; amount: number };
