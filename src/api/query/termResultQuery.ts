import { makeUrlParams } from '@/helpers';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';
import { SUBJECT_TYPE, TPromiseResponse } from '@/lib/types';

export const getStudentWithTermResult = async (
  args: TGetStudentWithTermResultArgs,
): TPromiseResponse<TGetStudentWithTermResultResponse> => {
  const response = await axiosInstance.get(apiUrl.getStudentsWithTermResult(makeUrlParams(args)));
  return response.data;
};

type TGetStudentWithTermResultArgs = { termId: string; classroomId: string; subjectId: string };

export type TGetStudentWithTermResultResponse = Array<{
  studentId: string;
  studentName: string;
  subjectType: SUBJECT_TYPE;
  subjectId: string;
  marks?: Record<string, number>;
}>;
