import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getDuesByClass = async (): TPromiseResponse<TGetDuesByClassResult> => {
  const response = await axiosInstance.get(apiUrl.getDuesByClass);
  return response.data;
};

export const getDuesByClassroom = async (level: string): TPromiseResponse<TGetDuesByClassroomResult> => {
  const url = apiUrl.getDuesByClassroom(level);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getDuesByStudent = async (classroomId: string): TPromiseResponse<TGetDuesByStudentResult> => {
  const url = apiUrl.getDuesByStudent(classroomId);
  const response = await axiosInstance.get(url);
  return response.data;
};

type TGetDuesByClassResult = Array<{
  level: string;
  name: string;
  totalDue: number;
  totalPaid: number;
  totalDiscount: number;
}>;

type TGetDuesByClassroomResult = Array<{
  id: string;
  name: string;
  classLevel: string;
  totalDue: number;
  totalPaid: number;
  totalDiscount: number;
}>;

export type TGetDuesByStudentResult = Array<{
  id: string;
  name: string;
  classLevel: string;
  classroomName: string;
  due: number;
}>;
