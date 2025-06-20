import { TObject, TPromiseResponse, TTeacher } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams, removeEmptyProperties } from '@/helpers';

export const addTeacher = async (payload: TAddTeacherPayload): TPromiseResponse => {
  const refinedPayload = removeEmptyProperties(payload);
  const response = await axiosInstance.post(apiUrl.addTeacher, refinedPayload);
  return response?.data;
};

export const getTeachers = async (args: TObject): TPromiseResponse<TTeacherInfo[]> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getTeachers(queryString);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const getTeacherList = async (): TPromiseResponse<TGetTeacherListResponse[]> => {
  const response = await axiosInstance.get(apiUrl.getTeacherList);
  return response?.data;
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
