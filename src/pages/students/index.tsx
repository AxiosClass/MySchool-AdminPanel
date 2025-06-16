import { PageTitle } from '@/components/shared/PageTitle';
import { StudentTable } from './StudentTable';

export default function StudentsPage() {
  return (
    <>
      <PageTitle title='Students' />
      <StudentTable />
    </>
  );
}
