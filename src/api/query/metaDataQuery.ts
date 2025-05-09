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

type TAttendanceSummary = { totalStudents: number; present: number; absent: number };
export type TAttendanceTrend = { date: string; count: number };
