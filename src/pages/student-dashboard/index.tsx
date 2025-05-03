import { PageTitle } from '@/components/shared';
import { StudentProfile } from './StudentProfile';

export default function StudentDashboardPage() {
  return (
    <>
      <PageTitle title='Student Profile' />
      <StudentProfile />
    </>
  );
}
