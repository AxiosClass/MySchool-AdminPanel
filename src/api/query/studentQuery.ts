import { TClassroom, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { TStudent } from '@/types';

export const addStudent = async (payload: TAddStudentPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addStudent, payload);
  return response?.data;
};

export const getStudents = async (): TPromiseResponse<TGetStudentResult[]> => {
  const response = await axiosInstance.get(apiUrl.getStudents);
  return response?.data;
};

export const issueNfcCard = async (payload: TIssueNfcCardPayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.issueNfcCard, payload);
  return response.data;
};

// types
type TAddStudentPayload = Pick<
  TStudent,
  'name' | 'birthId' | 'class' | 'classroomId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;

type TGetStudentResult = Pick<TStudent, 'id' | 'name' | 'address' | 'guardian' | 'admittedAt' | 'class' | 'cardId'> & {
  classroom: Pick<TClassroom, 'name'>;
};

type TIssueNfcCardPayload = Pick<TStudent, 'id' | 'cardId'>;
