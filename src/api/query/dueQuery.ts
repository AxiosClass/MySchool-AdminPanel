import { apiUrl } from '../apiUrl';
import { TObject, TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const getDuesByClass = async (): TPromiseResponse<TGetDuesByClass> => {
  const response = await axiosInstance.get(apiUrl.getDuesByClass);
  return response.data;
};

export const getDuesByClassroom = async (level: string): TPromiseResponse<TGetDuesByClassroom> => {
  const url = apiUrl.getDuesByClassroom(level);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getDuesByStudent = async (args: TObject) => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getDuesByStudent(queryString);
  const response = await axiosInstance.get(url);
  return response.data;
};

export type TGetDuesByClass = Array<{
  level: string;
  name: string;
  totalDue: number;
  totalPaid: number;
}>;

export type TGetDuesByClassroom = Array<{
  id: string;
  name: string;
  classLevel: string;
  totalDue: number;
  totalPaid: number;
}>;

export type TGetDuesByStudent = Array<{
  studentId: string;
  studentName: string;
  classLevel: string;
  classroomName: string;
  due: number;
}>;
