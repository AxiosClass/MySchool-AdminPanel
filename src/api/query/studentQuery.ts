import { TClass, TObject, TPromiseResponse, TStudent } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { makeUrlParams } from '@/helpers';

export const addStudent = async (payload: TAddStudentPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addStudent, payload);
  return response.data;
};

export const getStudents = async (args: TObject): TPromiseResponse<TGetStudentSResult> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getStudents(queryString);
  const response = await axiosInstance.get(url);
  return response?.data;
};

export const issueNfcCard = async (payload: TIssueNfcCardPayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.issueNfcCard, payload);
  return response.data;
};

export const getStudentInfo = async (studentId: string): TPromiseResponse<TStudentInfo> => {
  const url = apiUrl.getStudentInfo(studentId);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getStudentListForPayment = async (): TPromiseResponse<TGetStudentListForPaymentResult> => {
  const response = await axiosInstance.get(apiUrl.getStudentListForPayment);
  return response.data;
};

export const getStudentClassInfo = async (studentId: string): TPromiseResponse<TGetStudentClassInfoResult> => {
  const url = apiUrl.getStudentClassInfo(studentId);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getStudentDetails = async (studentId: string): TPromiseResponse<TGetStudentDetailsResult> => {
  const url = apiUrl.getStudentDetails(studentId);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const updateStudent = async ({ studentId, ...payload }: TUpdateStudentPayload): TPromiseResponse => {
  const url = apiUrl.updateStudent(studentId);
  const response = await axiosInstance.patch(url, payload);
  return response.data;
};

// types
type TAddStudentPayload = Pick<
  TStudent,
  'name' | 'birthId' | 'class' | 'classroomId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;

type TUpdateStudentPayload = Partial<TAddStudentPayload> & { studentId: string };

export type TGetStudentSResult = Array<
  Pick<TStudent, 'id' | 'name' | 'address' | 'guardian' | 'admittedAt' | 'class' | 'cardId'> & {
    classroomName: string;
  }
>;

type TIssueNfcCardPayload = Pick<TStudent, 'id' | 'cardId'>;
export type TStudentInfo = Pick<TStudent, 'id' | 'name' | 'admittedAt' | 'status'> & {
  classroomId: string;
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
export type TGetStudentDetailsResult = Pick<
  TStudent,
  'name' | 'birthId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;
