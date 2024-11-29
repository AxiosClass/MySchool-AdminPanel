import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { queryClient } from '../QueryProvider';
import { IServerResponse } from '@/types/common';
import { axiosInstance } from '../axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface ICreateClassroomPayload {
  name: string;
  classId: string;
  classTeacherId: string;
}

const createClassroom = async (payload: ICreateClassroomPayload): Promise<IServerResponse<null>> => {
  const response = await axiosInstance.post(apiUrl.createClassroom, payload);
  return response?.data;
};

export const useCreateClassroomMutation = () => {
  const createClassroomMutation = useMutation({
    mutationFn: createClassroom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.CLASSES, TAGS.CLASSROOMS] });
    },
  });

  return { createClassroomMutation, isLoading: createClassroomMutation.isPending };
};
