import { TOKEN_KEYS } from '@/data/keys';
import { AxiosError } from 'axios';
import { z } from 'zod';

export const removeEmptyProperties = (obj: Record<string, unknown>) => {
  return Object.keys(obj).reduce((acc: Record<string, unknown>, key) => {
    if (obj[key]) acc[key] = obj[key];
    return acc;
  }, {});
};

export const makeQueryUrl = (baseAddress: string, obj: Record<string, any>) => {
  const refinedObj = removeEmptyProperties(obj);
  return Object.keys(refinedObj).reduce((acc: string, key, index) => {
    if (index === 0) acc += `?${key}=${obj[key]}`;
    else acc += `&${key}=${obj[key]}`;
    return acc;
  }, baseAddress);
};

export const errorMessageGen = (error: unknown, defaultMessage: string = 'Something went wrong') => {
  let message = defaultMessage;
  console.log(typeof error);
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

type TZodNumberArgs = { min: number; message: string };
export const zodNumber = ({ min, message }: TZodNumberArgs) => {
  return z.string().refine((value) => value && Number(value) >= min, { message });
};
