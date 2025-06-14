import { TClassroom, TPromiseResponse, TStudent } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const addStudent = async (payload: TAddStudentPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addStudent, payload);
  return response?.data;
};

export const getStudents = async (): TPromiseResponse<TGetStudentResult[]> => {
  const response = await axiosInstance.get(apiUrl.getStudents);
  return response?.data;
};

export const issueNfcCard = async (payload: TIssueNfcCardPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.issueNfcCard, payload);
  return response.data;
};

export const getStudentInfo = async (studentId: string): TPromiseResponse<TStudentInfo> => {
  const response = await axiosInstance.get(apiUrl.getStudentInfo(studentId));
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
export type TStudentInfo = Pick<TStudent, 'id' | 'name' | 'admittedAt' | 'status'> & {
  classroomName: string;
  className: string;
  classLevel: string;
  totalPaid: number;
  totalDue: number;
  totalDiscount: number;
};
