import { getAccessTokenFormLocal, removeAccessTokenFromLocal } from '@/helpers';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { TLoggedUser } from '@/types';

export type TAuthStore = {
  user: TLoggedUser | null;
  updateUser(token: string): void;
  removeUser(): void;
};

let user: TLoggedUser | null = null;
const token = getAccessTokenFormLocal();
if (token) user = jwtDecode(token);

export const useAuthStore = create<TAuthStore>((set) => ({
  user,
  updateUser(token) {
    user = jwtDecode(token);
    set(() => ({ user }));
  },
  removeUser() {
    set(() => ({ user: null }));
    removeAccessTokenFromLocal();
  },
}));
