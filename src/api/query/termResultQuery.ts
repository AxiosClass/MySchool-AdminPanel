import { makeUrlParams } from '@/helpers';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';
import { SUBJECT_TYPE, TClass, TPromiseResponse, TTermResult } from '@/lib/types';

export const addTermResult = async (payload: TAddTermResultPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addTermResult, payload);
  return response.data;
};

export const getStudentWithTermResult = async (
  args: TGetStudentWithTermResultArgs,
): TPromiseResponse<TGetStudentWithTermResultResponse> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getStudentsWithTermResult(queryString);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getTermsResultSummary = async ({
  studentId,
  year,
}: TGetTermsResultSummaryArgs): TPromiseResponse<TTermResultSummaryResult> => {
  const url = apiUrl.getTermsResultSummary(studentId, year);
  const response = await axiosInstance.get(url);
  return response.data;
};

// Types
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

type TGetTermsResultSummaryArgs = { studentId: string; year: string };

export type TTermResultSummaryResult = Array<{
  termId: string;
  termName: string;
  academicYear: string;
  classInfo: Pick<TClass, 'name' | 'level'>;
  termGPA: number;
  termGrade: string;
  subjectResults: TSubjectResult[];
}>;

export type TSubjectResult = {
  subjectId: string;
  subjectName: string;
  fullMarks: number;
  obtainedMarks: number;
  grade: string;
  gpa: number;
  componentMarks: Record<string, { obtained: number; total: number }>;
};
