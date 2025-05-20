import { useQuery } from '@tanstack/react-query';
import { QK } from '@/api';
import { TUser } from '@/types';

export const useAuth = () => {
  const { data: user } = useQuery<TUser>({
    queryKey: [QK.AUTH],
  });

  return {
    user,
    isAuthenticated: !!user,
  };
};
