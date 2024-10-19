import { PageTitle } from '@/components/shared';
import { CreateClass } from './create-class';

export default function ClassesPage() {
  return (
    <PageTitle title='Classes'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>All Classes</h1>
        <CreateClass />
      </div>
    </PageTitle>
  );
}
