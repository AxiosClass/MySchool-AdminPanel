import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/stores/auth';
import { USER_ROLE } from '@/types';
import { Navigate } from 'react-router-dom';
import { AttendanceSummary } from './AttendanceSummary';
import { AttendanceTrends } from './AttendanceTrends';

export default function HomePage() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === USER_ROLE.TEACHER) return <Navigate to='/teacher' />;
  else if (user?.role === USER_ROLE.STUDENT) return <Navigate to='/student' />;

  return (
    <>
      <PageTitle title='Dashboard' />
      <ScrollArea className='grow p-6'>
        <AttendanceSummary />
        <div className='mt-6 flex items-center gap-6'>
          <AttendanceTrends />
        </div>
      </ScrollArea>
    </>
  );
}
