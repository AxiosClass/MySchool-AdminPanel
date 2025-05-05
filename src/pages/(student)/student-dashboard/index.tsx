import { PageTitle } from '@/components/shared';
import { StudentProfile } from './StudentProfile';
import { StudentAttendance } from './StudentAttendance';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function StudentDashboardPage() {
  return (
    <>
      <PageTitle title='Student Profile' />
      <ScrollArea className='px-6'>
        <StudentProfile />
        <StudentAttendance />
      </ScrollArea>
    </>
  );
}
