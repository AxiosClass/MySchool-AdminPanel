import { TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClassroom = async (payload: TCreateClassroomPayload): TPromiseResponse<null> => {
  const { data } = await axiosInstance.post(apiUrl.createClassroom, payload);
  return data;
};

// type
type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };
