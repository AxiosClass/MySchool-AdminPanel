import { TClass, TClassroom, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClass = async (payload: TCreateClassPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.createClass, payload);
  return response?.data;
};

export const getClasses = async (): TPromiseResponse<TGetClassResponse[]> => {
  const response = await axiosInstance.get(apiUrl.getClasses);
  return response?.data;
};

export const getClassDetails = async (classId: string): TPromiseResponse<TGetClassDetails> => {
  const response = await axiosInstance.get(apiUrl.getClassDetails(classId));
  return response?.data;
};

export const getClassList = async (): TPromiseResponse<TClassList[]> => {
  const response = await axiosInstance.get(apiUrl.getClassList);
  return response?.data;
};

export const getClassroomList = async (level: string): TPromiseResponse<TClassroomList[]> => {
  const response = await axiosInstance.get(apiUrl.getClassroomList(level));
  return response?.data;
};

// type
type TCreateClassPayload = Pick<TClass, 'name' | 'level' | 'monthlyFee' | 'admissionFee'>;

export type TGetClassResponse = {
  id: string;
  name: string;
  level: string;
  subjects: { id: string; name: string }[];
  classrooms: { id: string; students: { id: string }[] }[];
};

export type TGetClassDetails = {
  id: string;
  name: string;
  level: string;
  classrooms: { id: string; name: string; classTeacher: { id: string; name: string }; students: { id: string }[] }[];
};

type TClassList = Pick<TClass, 'level' | 'name'>;
type TClassroomList = Pick<TClassroom, 'id' | 'name'>;
