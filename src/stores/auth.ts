import { create } from 'zustand';
import { EUserRole } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';
import { getAccessTokenFromLocal } from '@/helpers';
import { ETokenKeys } from '@/lib/keys';

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

console.log(user);

export const useAuth = create<IAuthServices>((set) => ({
  user: user,
  login(token) {
    const user = jwtDecode(token) as IUser;
    if (user) {
      set(() => ({ user: { ...user } }));
    }
  },
  logout() {
    localStorage.removeItem(ETokenKeys.ACCESS_TOKEN);
    set(() => ({ user: null }));
  },
}));
