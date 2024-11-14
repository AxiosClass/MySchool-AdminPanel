import { PageTitle } from '@/components/shared';
import { AddStudent } from './add-student';

export default function StudentsPage() {
  return (
    <PageTitle title='Students'>
      <section className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Students</h1>
        <AddStudent />
      </section>
    </PageTitle>
  );
}
