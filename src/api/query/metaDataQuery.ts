import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';

export const getAttendanceSummary = async (): TPromiseResponse<TAttendanceSummary> => {
  const response = await axiosInstance.get(apiUrl.getAttendanceSummary);
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

type TAttendanceSummary = { totalStudents: number; present: number; absent: number };
export type TAttendanceTrend = { date: string; count: number };
export type TPaymentTrend = { month: string; amount: number };
