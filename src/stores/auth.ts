import { create } from 'zustand';
import { EUserRole } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';
import { getAccessTokenFromLocal } from '@/helpers';

interface IUser {
  id: string;
  name: string;
  role: EUserRole;
}

interface IAuthServices {
  user: IUser | null;
  login(token: string): void;
  logout(): void;
}

let user: IUser | null = null;

const accessToken = getAccessTokenFromLocal();
if (accessToken) user = jwtDecode(accessToken);

export const useAuth = create<IAuthServices>((set) => ({
  user: user,
  login(token) {
    const user = jwtDecode(token) as IUser;
    if (user) {
      set(() => ({ user: { ...user } }));
    }
  },
  logout() {
    set(() => ({ user: null }));
  },
}));
