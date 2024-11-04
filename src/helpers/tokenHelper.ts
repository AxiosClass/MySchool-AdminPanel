import { ETokenKeys } from '@/lib/keys';

export const setAccessTokenToLocal = (accessToken: string) => {
  localStorage.setItem(ETokenKeys.ACCESS_TOKEN, accessToken);
};

export const setRefreshTokenToLocal = (refreshToken: string) => {
  localStorage.setItem(ETokenKeys.REFRESH_TOKEN, refreshToken);
};
