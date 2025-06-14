import { TClass, TClassroom, TPromiseResponse, TSubject } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClass = async (payload: TCreateClassPayload): TPromiseResponse => {
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

export const assignSubjects = async (payload: TAssignedSubjectPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.assignSubjects, payload);
  return response?.data;
};

export const getAssignedSubjects = async (classId: string): TPromiseResponse<TAssignedSubject[]> => {
  const response = await axiosInstance.get(apiUrl.getAssignedSubjects(classId));
  return response.data;
};

// type
type TCreateClassPayload = Pick<TClass, 'name' | 'level' | 'monthlyFee' | 'admissionFee' | 'termFee'>;
type TAssignedSubject = Pick<TSubject, 'id' | 'name' | 'description' | 'type'>;

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

type TAssignedSubjectPayload = { classId: string; subjectIds: string[] };
type TClassList = Pick<TClass, 'level' | 'name'>;
type TClassroomList = Pick<TClassroom, 'id' | 'name'>;
