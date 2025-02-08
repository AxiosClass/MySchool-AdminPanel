import { TNotice, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { apiUrl } from '../apiUrl';

export const addNotice = async (payload: TAddNoticePayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addNotice, payload);
  return response?.data;
};

// types
type TAddNoticePayload = Pick<TNotice, 'title' | 'description' | 'noticeFor'>;
