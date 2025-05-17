import { apiUrl } from '../apiUrl';
import { TPromiseResponse, TSubject } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const createSubject = async (payload: TCreateSubjectPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createSubject, payload);
  return response.data;
};

export const getSubjects = async (args: Record<string, string>): TPromiseResponse<TAssignedSubject[]> => {
  const response = await axiosInstance.get(makeUrlParams(args));
  return response?.data;
};

export const assignSubjects = async (payload: TAssignedSubjectPayload): TPromiseResponse => {
  const response = await axiosInstance.put(apiUrl.assignSubjects, payload);
  return response?.data;
};

type TCreateSubjectPayload = Pick<TSubject, 'name' | 'description' | 'type'> & {
  children?: Pick<TSubject, 'name' | 'description' | 'type'>[];
};

type TAssignedSubject = { id: string; name: string; classId: string };
type TAssignedSubjectPayload = { classId: string; subjects: string[] };
