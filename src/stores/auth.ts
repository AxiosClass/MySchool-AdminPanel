import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

import { getAccessTokenFormLocal, removeAccessTokenFromLocal } from '@/helpers';
import { ILoggedUser } from '@/types/user';

export interface IAuthStore {
  user: ILoggedUser | null;
  updateUser(token: string): void;
  removeUser(): void;
}

let user: ILoggedUser | null = null;
const token = getAccessTokenFormLocal();
if (token) user = jwtDecode(token);

export const useAuthStore = create<IAuthStore>((set) => ({
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
