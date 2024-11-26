import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

// ********* add new student ********* \\
interface IAddStudentPayload {
  name: string;
  birthId: string;
  dob: string;
  bloodGroup: string;
  address: string;
  parents: { fatherName: string; motherName: string };
  guardian: { name: string; phone: string; relation: string };
  classroomId: string;
}

const addStudent = async (payload: IAddStudentPayload): Promise<IServerResponse<null>> => {
  const response = await axiosInstance.post(apiUrl.addStudent, payload);
  return response?.data;
};

export const useAddStudentMutation = () => {
  const addStudentMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.STUDENTS] });
    },
  });

  return { addStudentMutation, isLoading: addStudentMutation.isPending };
};
