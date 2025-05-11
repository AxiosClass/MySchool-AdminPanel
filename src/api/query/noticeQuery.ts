import { apiUrl } from '../apiUrl';
import { TNotice, TObject, TPromiseResponse } from '@/types';
import { axiosInstance } from '../axiosInstance';
import { removeEmptyProperties } from '@/helpers';

export const addNotice = async (payload: TAddNoticePayload): TPromiseResponse<null> => {
  const response = await axiosInstance.post(apiUrl.addNotice, payload);
  return response.data;
};

export const getNotices = async (args: TObject = {}): TPromiseResponse<TNotice[]> => {
  const refinedArgs = removeEmptyProperties(args);
  const searchParams = new URLSearchParams(refinedArgs as TObject).toString();
  const response = await axiosInstance.get(apiUrl.getNotices(searchParams ? `?${searchParams}` : ''));
  return response.data;
};

export const getMyNotices = async (): TPromiseResponse<TNotice[]> => {
  const notices = await axiosInstance.get(apiUrl.getMyNotices);
  return notices.data;
};

export const updateNotice = async (payload: TUpdateNoticePayload): TPromiseResponse<null> => {
  const { id, title, description, noticeFor } = payload;
  const response = await axiosInstance.patch(apiUrl.updateNotice(id!), { title, description, noticeFor });
  return response.data;
};

export const deleteNotice = async (noticeId: string): TPromiseResponse<null> => {
  const response = await axiosInstance.delete(apiUrl.deleteNotice(noticeId));
  return response.data;
};

// types
type TAddNoticePayload = Pick<TNotice, 'title' | 'description' | 'noticeFor'>;
type TUpdateNoticePayload = TAddNoticePayload & { id: string };
