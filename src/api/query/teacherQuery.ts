import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

type TGetTeacherListResponse = { id: string; name: string };
export const getTeacherList = async (): Promise<TServerResponse<TGetTeacherListResponse[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getStudents);
  return data;
};
