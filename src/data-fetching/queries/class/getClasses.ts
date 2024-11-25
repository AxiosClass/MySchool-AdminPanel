import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../../axiosInstance';
import { apiUrl } from '../../apiUrl';
import { useQuery } from '@tanstack/react-query';
import { TAGS } from '../../tags';

export interface IClassInfo {
  id: string;
  name: string;
  level: string;
  subjects: { id: string; name: string }[];
  classrooms: { id: string; students: { id: string }[] }[];
}

const getClasses = async (): Promise<IServerResponse<IClassInfo[]>> => {
  const response = await axiosInstance.get(apiUrl.getClasses);
  return response?.data;
};

export const useGetClassesQuery = () => {
  return useQuery({ queryFn: getClasses, queryKey: [TAGS.CLASSES] });
};
