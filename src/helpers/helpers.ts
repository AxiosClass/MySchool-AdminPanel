import { TOKEN_KEYS } from '@/data/keys';
import { TObject } from '@/lib/types';
import { AxiosError } from 'axios';
import moment from 'moment';
import { toast } from 'sonner';
import { z } from 'zod';

export const removeEmptyProperties = <TData = unknown>(obj: TObject<TData>) => {
  return Object.keys(obj).reduce((acc: TObject<TData>, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});
};

export const makeUrlParams = (obj: TObject) => {
  const refinedObj = removeEmptyProperties(obj);
  const searchParams = new URLSearchParams(refinedObj).toString();
  return searchParams ? `?${searchParams}` : '';
};

export const errorMessageGen = (error: unknown, defaultMessage: string = 'Something went wrong') => {
  let message = defaultMessage;
  if (error instanceof AxiosError) message = error.response?.data?.message;
  else if (error instanceof Error) message = error.message;
  return message;
};

export const setAccessTokenToLocal = (accessToken: string) => {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
};

export const getAccessTokenFormLocal = () => {
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const removeAccessTokenFromLocal = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const zodNumber = ({ min, message }: TZodNumberArgs) => {
  return z.string().refine((value) => value && Number(value) >= min, { message });
};

export const errorToast = (error: unknown) => toast.error(errorMessageGen(error));

export const getYearsFromDateToNow = (date: string | Date) => {
  let start = moment(date).startOf('year');
  const end = moment().startOf('year');

  if (!start.isValid()) start = moment().startOf('year');

  const years: string[] = [];
  for (let year = start.year(); year <= end.year(); year++) {
    years.push(String(year));
  }
  return years;
};

// type
type TZodNumberArgs = { min: number; message: string };
