import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

type TGetClassResponse = {
  id: string;
  name: string;
  level: string;
  subjects: { id: string; name: string }[];
  classrooms: { id: string; students: { id: string }[] }[];
};

export const getClasses = async (): Promise<TServerResponse<TGetClassResponse[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getClasses);
  return data;
};
