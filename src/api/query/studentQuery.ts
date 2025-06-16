import { TClass, TObject, TPromiseResponse, TStudent } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams } from '@/helpers';

export const addStudent = async (payload: TAddStudentPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addStudent, payload);
  return response?.data;
};

export const getStudents = async (args: TObject): TPromiseResponse<TGetStudentSResult> => {
  const response = await axiosInstance.get(apiUrl.getStudents(makeUrlParams(args)));
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

export const getStudentListForPayment = async (): TPromiseResponse<TGetStudentListForPaymentResult> => {
  const response = await axiosInstance.get(apiUrl.getStudentListForPayment);
  return response.data;
};

export const getStudentClassInfo = async (studentId: string): TPromiseResponse<TGetStudentClassInfoResult> => {
  const response = await axiosInstance.get(apiUrl.getStudentClassInfo(studentId));
  return response.data;
};

// types
type TAddStudentPayload = Pick<
  TStudent,
  'name' | 'birthId' | 'class' | 'classroomId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;

export type TGetStudentSResult = Array<
  Pick<TStudent, 'id' | 'name' | 'address' | 'guardian' | 'admittedAt' | 'class' | 'cardId'> & {
    classroomName: string;
  }
>;

type TIssueNfcCardPayload = Pick<TStudent, 'id' | 'cardId'>;
export type TStudentInfo = Pick<TStudent, 'id' | 'name' | 'admittedAt' | 'status'> & {
  classroomName: string;
  className: string;
  classLevel: string;
  totalPaid: number;
  totalDue: number;
  totalDiscount: number;
};

export type TGetStudentListForPaymentResult = Array<
  Pick<TStudent, 'id' | 'name'> & { classroomName: string; className: string; classLevel: string }
>;

export type TGetStudentClassInfoResult = Pick<TClass, 'id' | 'name' | 'admissionFee' | 'monthlyFee' | 'termFee'>;
