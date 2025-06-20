import { PageTitle } from '@/components/shared/PageTitle';
import { TeacherTable } from './TeacherTable';

export default function TeachersPage() {
  return (
    <>
      <PageTitle title='Teachers' />
      <TeacherTable />
    </>
  );
}
