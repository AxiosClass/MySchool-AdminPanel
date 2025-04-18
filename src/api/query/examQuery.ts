import { TExam, TObject, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { removeEmptyProperties } from '@/helpers';

export const addExam = async (payload: TAddExamPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addExam, payload);
  return response.data;
};

export const getExams = async (args: TObject): TPromiseResponse<TExam[]> => {
  const refinedArgs = removeEmptyProperties(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  const response = await axiosInstance.get(apiUrl.getExams(searchParams ? `?${searchParams}` : ''));
  return response.data;
};

export const updateExam = async (args: TUpdateExamPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.patch(apiUrl.updateExam(args.id), args.payload);
  return response.data;
};

export const deleteExam = async (examId: string): TPromiseResponse<null> => {
  const response = await axiosInstance.delete(apiUrl.deleteExam(examId));
  return response.data;
};

type TAddExamPayload = Pick<TExam, 'name' | 'year' | 'percentile'>;
type TUpdateExamPayload = { id: string; payload: Partial<Pick<TExam, 'name' | 'year' | 'status'>> };
