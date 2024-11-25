import { axiosInstance } from '@/data-fetching/axiosInstance';
import { apiUrl } from '@/data-fetching/apiUrl';
import { useQuery } from '@tanstack/react-query';
import { TAGS } from '@/data-fetching/tags';
import { IServerResponse } from '@/types/common';

interface ITeacherInfo {
  id: string;
  name: string;
  phone: string;
  salary: string;
  classroomsClassTeacher: {
    name: string;
    class: {
      level: string;
    };
  }[];
  joinedAt: string;
}

export const getTeachers = async (): Promise<IServerResponse<ITeacherInfo[]>> => {
  const response = await axiosInstance.get(apiUrl.getTeachers);
  return response.data;
};

export const useGetTeachersQuery = () => {
  return useQuery({ queryKey: [TAGS.TEACHERS], queryFn: getTeachers });
};
