import { TClass, TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

type TCreateClassPayload = Pick<TClass, 'name' | 'level' | 'monthlyFee' | 'admissionFee'>;
export const createClass = async (payload: TCreateClassPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.createClass, payload);
  return data;
};

export type TGetClassResponse = {
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

export type TGetClassDetails = {
  id: string;
  name: string;
  level: string;
  classrooms: { id: string; name: string; classTeacher: { id: string; name: string }; students: { id: string }[] }[];
};

export const getClassDetails = async (classId: string): Promise<TServerResponse<TGetClassDetails>> => {
  const { data } = await axiosInstance.get(apiUrl.getClassDetails(classId));
  return data;
};
