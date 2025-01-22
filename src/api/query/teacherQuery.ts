import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

type TTeacherInfo = {
  id: string;
  name: string;
  phone: string;
  salary: string;
  classroomsClassTeacher: { name: string; class: { level: string } }[];
  joinedAt: string;
};

export const getTeachers = async (): Promise<TServerResponse<TTeacherInfo[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getTeachers);
  return data;
};

type TGetTeacherListResponse = { id: string; name: string };
export const getTeacherList = async (): Promise<TServerResponse<TGetTeacherListResponse[]>> => {
  const { data } = await axiosInstance.get(apiUrl.getStudents);
  return data;
};
