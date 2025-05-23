import { apiUrl } from '../apiUrl';
import { TObject, TPromiseResponse, TSubject } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const createSubject = async (payload: TCreateSubjectPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.createSubject, payload);
  return response.data;
};

export const getSubjects = async (args: TObject): TPromiseResponse<TGetSubjectsQueryResult[]> => {
  const response = await axiosInstance.get(apiUrl.getSubjects(makeUrlParams(args)));
  return response?.data;
};

export const deleteSubject = async (subjectId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteSubject(subjectId));
  return response.data;
};

type TCreateSubjectPayload = Pick<TSubject, 'name' | 'description' | 'type'> & {
  children?: Pick<TSubject, 'name' | 'description' | 'type'>[];
};

export type TGetSubjectsQueryResult = Pick<TSubject, 'id' | 'name' | 'type' | 'description'> & {
  childSubject: Pick<TSubject, 'id' | 'name' | 'type'>[];
};
