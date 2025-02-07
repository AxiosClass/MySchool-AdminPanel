import { TPromiseResponse, TTeacher } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { removeEmptyProperties } from '@/helpers';

export const getTeachers = async (): TPromiseResponse<TTeacherInfo[]> => {
  const { data } = await axiosInstance.get(apiUrl.getTeachers);
  return data;
};

export const getTeacherList = async (): TPromiseResponse<TGetTeacherListResponse[]> => {
  const { data } = await axiosInstance.get(apiUrl.getStudents);
  return data;
};

export const addTeacher = async (payload: TAddTeacherPayload): TPromiseResponse<null> => {
  const refinedPayload = removeEmptyProperties(payload);
  const { data } = await axiosInstance.post(apiUrl.addTeacher, refinedPayload);
  return data;
};

// type
type TTeacherInfo = {
  id: string;
  name: string;
  phone: string;
  salary: string;
  classroomsClassTeacher: { name: string; class: { level: string } }[];
  joinedAt: string;
};

type TGetTeacherListResponse = { id: string; name: string };

type TAddTeacherPayload = Pick<
  TTeacher,
  'id' | 'name' | 'nid' | 'phone' | 'dob' | 'salary' | 'bloodGroup' | 'address' | 'education'
>;
