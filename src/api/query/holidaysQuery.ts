import { TPromiseResponse, THoliday } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const getHolidays = async (): TPromiseResponse<TGetHolidaysResult[]> => {
  const response = await axiosInstance.get(apiUrl.getHolidays);
  return response.data;
};

export const addHoliday = async (payload: TAddHolidayPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addHoliday, payload);
  return response.data;
};

export const deleteHoliday = async (holidayId: string): TPromiseResponse => {
  const url = apiUrl.deleteHoliday(holidayId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

// types

type TGetHolidaysResult = Pick<THoliday, 'id' | 'name' | 'description' | 'startDate' | 'endDate'>;

type TAddHolidayPayload = Pick<THoliday, 'name' | 'description' | 'startDate' | 'endDate'>;
