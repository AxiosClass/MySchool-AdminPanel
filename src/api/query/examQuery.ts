import { TExam, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const addExam = async (payload: TAddExamPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addExam, payload);
  return response.data;
};

type TAddExamPayload = Pick<TExam, 'name' | 'year'>;
