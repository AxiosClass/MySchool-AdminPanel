import { apiUrl } from '../apiUrl';
import { TNotice, TObject, TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const addNotice = async (payload: TAddNoticePayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addNotice, payload);
  return response.data;
};

export const getNotices = async (args: TObject = {}): TPromiseResponse<TNotice[]> => {
  const response = await axiosInstance.get(apiUrl.getNotices(makeUrlParams(args)));
  return response.data;
};

export const getMyNotices = async (): TPromiseResponse<TNotice[]> => {
  const notices = await axiosInstance.get(apiUrl.getMyNotices);
  return notices.data;
};

export const updateNotice = async (payload: TUpdateNoticePayload): TPromiseResponse => {
  const { id, title, description, noticeFor } = payload;
  const response = await axiosInstance.patch(apiUrl.updateNotice(id!), { title, description, noticeFor });
  return response.data;
};

export const deleteNotice = async (noticeId: string): TPromiseResponse => {
  const response = await axiosInstance.delete(apiUrl.deleteNotice(noticeId));
  return response.data;
};

// types
type TAddNoticePayload = Pick<TNotice, 'title' | 'description' | 'noticeFor'>;
type TUpdateNoticePayload = TAddNoticePayload & { id: string };
