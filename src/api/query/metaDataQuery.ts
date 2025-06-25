import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const getOverview = async (): TPromiseResponse<TAttendanceSummary> => {
  const response = await axiosInstance.get(apiUrl.getOverview);
  return response.data;
};

export const getAttendanceTrends = async (args: { range?: string }): TPromiseResponse<TAttendanceTrend[]> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getAttendanceTrends(queryString);
  const response = await axiosInstance.get(url);
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
