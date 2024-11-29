import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

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

// ********* get students ********* \\
interface IGetStudent {
  id: string;
  name: string;
  address: string;
  guardian: {
    name: string;
    phone: string;
  };
  admittedAt: string;
  class: string;
  classroom: {
    name: string;
  };
}

const getStudents = async (): Promise<IServerResponse<IGetStudent[]>> => {
  const response = await axiosInstance.get(apiUrl.getStudents);
  return response?.data;
};

export const useGetStudents = () => {
  return useQuery({ queryKey: [TAGS.STUDENTS], queryFn: getStudents });
};
