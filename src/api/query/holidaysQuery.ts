import { TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const getHolidays = async (): TPromiseResponse<TGetHolidaysResult[]> => {
  const response = await axiosInstance.get(apiUrl.getHolidays);
  return response?.data;
};

export const addHoliday = async (payload: TAddHolidayPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addHoliday, payload);
  return response?.data;
};

// types

export type TGetHolidaysResult = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type TAddHolidayPayload = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};
