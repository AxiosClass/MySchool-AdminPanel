import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const getSubjects = async (args: Record<string, string>): TPromiseResponse<TAssignedSubject[]> => {
  const response = await axiosInstance.get(makeUrlParams(args));
  return response?.data;
};

export const assignSubjects = async (payload: TAssignedSubjectPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.put(apiUrl.assignSubjects, payload);
  return response?.data;
};

type TAssignedSubject = { id: string; name: string; classId: string };
type TAssignedSubjectPayload = { classId: string; subjects: string[] };
