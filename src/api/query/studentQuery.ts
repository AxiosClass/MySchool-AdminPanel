import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';
import { TStudent } from '@/types';

export const addStudent = async (payload: TAddStudentPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.addStudent, payload);
  return data;
};

// types
type TAddStudentPayload = Pick<
  TStudent,
  'name' | 'birthId' | 'class' | 'classroomId' | 'bloodGroup' | 'dob' | 'address' | 'parents' | 'guardian'
>;

// {
//   name: string;
//   birthId: string;
//   dob: string;
//   bloodGroup: string;
//   address: string;
//   parents: { fatherName: string; motherName: string };
//   guardian: { name: string; phone: string; relation: string };
//   classroomId: string;
// };
