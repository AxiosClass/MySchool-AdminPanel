import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const createClassroom = async (payload: TCreateClassroomPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.createClassroom, payload);
  return data;
};

// type
type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };
