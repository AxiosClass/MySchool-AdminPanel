import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';

export const getDuesByClassroom = async (): TPromiseResponse<TGetDuesByClassroom> => {
  const response = await axiosInstance.get(apiUrl.getDuesByClassroom);
  return response.data;
};

export type TGetDuesByClassroom = {
  totalDue: number;
  totalPaid: number;
  classrooms: Array<{
    id: string;
    name: string;
    classLevel: string;
    totalDue: number;
    totalPaid: number;
  }>;
};
