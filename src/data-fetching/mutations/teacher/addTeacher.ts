import { apiUrl } from '../../apiUrl';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../axiosInstance';
import { queryClient } from '../../QueryProvider';
import { IServerResponse } from '@/types/common';

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
      queryClient.invalidateQueries({ queryKey: [] });
    },
  });

  return { addTeacherMutation, isLoading: addTeacherMutation.isPending };
};
