import { TAGS } from '../tags';
import { apiUrl } from '../apiUrl';
import { axiosInstance } from '../axiosInstance';
import { IServerResponse } from '@/types/common';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../QueryProvider';

const createClass = async (payload: {
  name: string;
  level: string;
}): Promise<IServerResponse<null>> => {
  const response = await axiosInstance.post(apiUrl.createClass, payload);
  return response?.data;
};

export const useCreateClassMutation = () => {
  const addClassMutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TAGS.CLASSES] });
    },
  });

  return { addClassMutation, isLoading: addClassMutation.isPending };
};
