import { apiUrl } from '../apiUrl';
import { TNotice, TObject, TPromiseResponse } from '@/lib/types';
import { axiosInstance } from '../axiosInstance';
import { makeUrlParams } from '@/helpers';

export const addNotice = async (payload: TAddNoticePayload): TPromiseResponse => {
  const response = await axiosInstance.post(apiUrl.addNotice, payload);
  return response.data;
};

export const getNotices = async (args: TObject = {}): TPromiseResponse<TNotice[]> => {
  const queryString = makeUrlParams(args);
  const url = apiUrl.getNotices(queryString);
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getMyNotices = async (): TPromiseResponse<TNotice[]> => {
  const notices = await axiosInstance.get(apiUrl.getMyNotices);
  return notices.data;
};

export const updateNotice = async ({ id, ...payload }: TUpdateNoticePayload): TPromiseResponse => {
  const url = apiUrl.updateNotice(id);
  const response = await axiosInstance.patch(url, payload);
  return response.data;
};

export const deleteNotice = async (noticeId: string): TPromiseResponse => {
  const url = apiUrl.deleteNotice(noticeId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

// types
type TAddNoticePayload = Pick<TNotice, 'title' | 'description' | 'noticeFor'>;
type TUpdateNoticePayload = TAddNoticePayload & { id: string };
