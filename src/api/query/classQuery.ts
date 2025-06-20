import { TClass, TClassroom, TPromiseResponse, TSubject } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClass = async (payload: TCreateClassPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createClass, payload);
  return response?.data;
};

export const updateClass = async ({ classId, ...payload }: TUpdateClassPayload): TPromiseResponse => {
  const url = apiUrl.updateClass(classId);
  const response = await axiosInstance.patch(url, payload);
  return response.data;
};

export const getClasses = async (): TPromiseResponse<TGetClassResponse> => {
  const response = await axiosInstance.get(apiUrl.getClasses);
  return response?.data;
};

export const getClassDetails = async (classId: string): TPromiseResponse<TGetClassDetails> => {
  const url = apiUrl.getClassDetails(classId);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const getClassList = async (): TPromiseResponse<TClassList[]> => {
  const response = await axiosInstance.get(apiUrl.getClassList);
  return response?.data;
};

export const getClassroomList = async (level: string): TPromiseResponse<TClassroomList[]> => {
  const url = apiUrl.getClassroomList(level);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const assignSubjects = async (payload: TAssignedSubjectPayload): TPromiseResponse => {
  const response = await axiosInstance.patch(apiUrl.assignSubjects, payload);
  return response?.data;
};

export const getAssignedSubjects = async (classId: string): TPromiseResponse<TAssignedSubject[]> => {
  const url = apiUrl.getAssignedSubjects(classId);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const deleteClass = async (classId: string): TPromiseResponse => {
  const url = apiUrl.deleteClass(classId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

// type
type TCreateClassPayload = Pick<TClass, 'name' | 'level' | 'monthlyFee' | 'admissionFee' | 'termFee'>;
type TUpdateClassPayload = Partial<TCreateClassPayload> & { classId: string };
type TAssignedSubject = Pick<TSubject, 'id' | 'name' | 'description' | 'type'>;

export type TGetClassResponse = Array<
  Pick<TClass, 'id' | 'name' | 'level' | 'admissionFee' | 'monthlyFee' | 'termFee'> & {
    totalStudent: number;
    totalClassroom: number;
  }
>;

export type TGetClassDetails = {
  id: string;
  name: string;
  level: string;
  classrooms: { id: string; name: string; classTeacher: { id: string; name: string }; students: { id: string }[] }[];
};

type TAssignedSubjectPayload = { classId: string; subjectIds: string[] };
type TClassList = Pick<TClass, 'level' | 'name'>;
type TClassroomList = Pick<TClassroom, 'id' | 'name'>;
