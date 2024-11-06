interface IArgs {
  url: string;
  method: 'GET' | 'POST';
  body: unknown;
}

export const clientFetch = async ({ url, method, body }: IArgs) => {
  const response = await fetch(url, {
    headers: {
      ['Content-Type']: 'application/json',
      ['Accept']: 'application/json',
    },
    method,
    body: JSON.stringify(body),
  });

  return response.json();
};
