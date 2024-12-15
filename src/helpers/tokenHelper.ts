import { TOKEN_KEYS } from '@/data/keys';

export const setAccessTokenToLocal = (accessToken: string) => {
  localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
};

export const getAccessTokenFormLocal = () => {
  return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
};

export const removeAccessTokenFromLocal = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
};
