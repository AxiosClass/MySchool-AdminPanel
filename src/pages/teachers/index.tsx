import { PageTitle } from '@/components/shared';
import { AddTeacher } from './add-teacher';

export default function TeachersPage() {
  return (
    <PageTitle title='Teachers'>
      <section className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Teachers</h1>
        <AddTeacher />
      </section>
    </PageTitle>
  );
}
