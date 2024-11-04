import { PageTitle } from '@/components/shared';
import { AddStaff } from './add-staff';

export default function StaffsPage() {
  return (
    <PageTitle title='Staffs'>
      <main className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>All Staffs</h1>
        <AddStaff />
      </main>
    </PageTitle>
  );
}
