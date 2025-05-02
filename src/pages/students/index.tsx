import { PageHeader } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { AddStudent } from './AddStudent';
import { StudentTable } from './StudentTable';

export default function StudentsPage() {
  return (
    <>
      <PageTitle title='Students' />
      <PageHeader label='Students'>
        <AddStudent />
      </PageHeader>
      <StudentTable />
    </>
  );
}
