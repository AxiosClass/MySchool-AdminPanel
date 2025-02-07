import { TClassroom, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { TStudent } from '@/types';

export const addStudent = async (payload: TAddStudentPayload): TPromiseResponse<null> => {
  const { data } = await axiosInstance.post(apiUrl.addStudent, payload);
  return data;
};

export const getStudents = async (): TPromiseResponse<TGetStudentResult[]> => {
  const { data } = await axiosInstance.get(apiUrl.getStudents);
  return data;
};

// types
type TAddStudentPayload = Pick<
  TStudent,
  'name' | 'birthId' | 'class' | 'classroomId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;

type TGetStudentResult = Pick<TStudent, 'id' | 'name' | 'address' | 'guardian' | 'admittedAt' | 'class'> & {
  classroom: Pick<TClassroom, 'name'>;
};
