import { apiUrl } from '../apiUrl';
import { TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { removeEmptyProperties } from '@/helpers';

export const getSubjects = async (args: Record<string, string>): TPromiseResponse<TAssignedSubject[]> => {
  const refinedArgs = removeEmptyProperties<string>(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();

  const response = await axiosInstance.get(apiUrl.getSubjects(searchParams ? `?${searchParams}` : ''));
  return response?.data;
};

export const assignSubjects = async (payload: TAssignedSubjectPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.put(apiUrl.assignSubjects, payload);
  return response?.data;
};

type TAssignedSubject = { id: string; name: string; classId: string };
type TAssignedSubjectPayload = { classId: string; subjects: string[] };
