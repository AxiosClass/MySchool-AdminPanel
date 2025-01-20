import { TServerResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

type TCreateClassroomPayload = { name: string; classId: string; classTeacherId: string };
export const createClassroom = async (payload: TCreateClassroomPayload): Promise<TServerResponse<null>> => {
  const { data } = await axiosInstance.post(apiUrl.createClassroom, payload);
  return data;
};
