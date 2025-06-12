import { makeUrlParams } from '@/helpers';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';
import { SUBJECT_TYPE, TPromiseResponse, TTermResult } from '@/lib/types';

export const addTermResult = async (payload: TAddTermResultPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addTermResult, payload);
  return response.data;
};

export const getStudentWithTermResult = async (
  args: TGetStudentWithTermResultArgs,
): TPromiseResponse<TGetStudentWithTermResultResponse> => {
  const response = await axiosInstance.get(apiUrl.getStudentsWithTermResult(makeUrlParams(args)));
  return response.data;
};

type TAddTermResultPayload = Pick<TTermResult, 'termId' | 'studentId' | 'subjectId' | 'marks'> & {
  classroomId: string;
};

type TGetStudentWithTermResultArgs = { termId: string; classroomId: string; subjectId: string };

export type TGetStudentWithTermResultResponse = Array<{
  studentId: string;
  studentName: string;
  subjectType: SUBJECT_TYPE;
  subjectId: string;
  marks?: Record<string, number>;
}>;
