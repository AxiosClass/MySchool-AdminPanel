import { TObject, TPromiseResponse, TTeacher } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams, removeEmptyProperties } from '@/helpers';

export const addTeacher = async (payload: TAddTeacherPayload): TPromiseResponse => {
  const refinedPayload = removeEmptyProperties(payload);
  const response = await axiosInstance.post(apiUrl.addTeacher, refinedPayload);
  return response?.data;
};

export const getTeachers = async (args: TObject): TPromiseResponse<TGetTeachersResult> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getTeachers(queryString);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const getTeacherList = async (): TPromiseResponse<TGetTeacherListResult> => {
  const response = await axiosInstance.get(apiUrl.getTeacherList);
  return response?.data;
};

export const getTeacherDetails = async (teacherId: string): TPromiseResponse<TGetTeacherDetailsResult> => {
  const url = apiUrl.getTeacherDetails(teacherId);
  const response = await axiosInstance.get(url);
  return response.data;
};

type TAddTeacherPayload = Pick<
  TTeacher,
  'id' | 'name' | 'nid' | 'phone' | 'dob' | 'salary' | 'bloodGroup' | 'address' | 'education'
>;

export type TGetTeachersResult = Array<
  Pick<TTeacher, 'id' | 'name' | 'phone' | 'salary' | 'joinedAt'> & { classroomName: string; classLevel: string }
>;

type TGetTeacherListResult = Array<Pick<TTeacher, 'id' | 'name'>>;

type TGetTeacherDetailsResult = Pick<
  TTeacher,
  'id' | 'name' | 'nid' | 'phone' | 'dob' | 'bloodGroup' | 'address' | 'salary' | 'education'
>;
