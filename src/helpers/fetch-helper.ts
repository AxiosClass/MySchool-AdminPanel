import { ERequestMethod } from '@/lib/types';

interface IArgs {
  url: string;
  method: ERequestMethod;
  body?: unknown;
}

export const fetchHelper = async ({ url, method, body }: IArgs) => {
  const response = await fetch(url, {
    method,
    headers: {
      ['Accept']: 'application.json',
      ['Content-Type']: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
};
