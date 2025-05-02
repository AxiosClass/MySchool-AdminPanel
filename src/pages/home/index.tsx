import { useAuthStore } from '@/stores/auth';
import { USER_ROLE } from '@/types';
import { Navigate } from 'react-router-dom';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === USER_ROLE.TEACHER) return <Navigate to='/teacher' />;

  return (
    <main>
      <h1>Home Page </h1>
    </main>
  );
}
