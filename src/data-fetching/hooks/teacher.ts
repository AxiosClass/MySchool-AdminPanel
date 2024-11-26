import { apiUrl } from '../apiUrl';
import { TAGS } from '@/data-fetching/tags';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';

// ********* add new teacher ********* \\
interface IAddTeacherPayload {
  id: string;
  name: string;
  nid: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  salary: number;
  address: string;
  education: {
    degree: string;
    passedYear: string;
  };
}

const addTeacher = async (payload: IAddTeacherPayload): Promise<IServerResponse<null>> => {
  const response = await axiosInstance.post(apiUrl.addTeacher, payload);
  return response?.data;
};

export const useAddTeacherMutation = () => {
  const addTeacherMutation = useMutation({
    mutationFn: addTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.TEACHERS] });
    },
  });

  return { addTeacherMutation, isLoading: addTeacherMutation.isPending };
};
// ********* get teachers ********* \\
interface ITeacherInfo {
  id: string;
  name: string;
  phone: string;
  salary: string;
  classroomsClassTeacher: {
    name: string;
    class: {
      level: string;
    };
  }[];
  joinedAt: string;
}

export const getTeachers = async (): Promise<IServerResponse<ITeacherInfo[]>> => {
  const response = await axiosInstance.get(apiUrl.getTeachers);
  return response.data;
};

export const useGetTeachersQuery = () => {
  return useQuery({ queryKey: [TAGS.TEACHERS], queryFn: getTeachers });
};
