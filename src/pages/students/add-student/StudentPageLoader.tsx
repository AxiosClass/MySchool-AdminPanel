import { PageHeaderLoader } from '@/components/loader/PageHeaderLoader';
import { TableLoader } from '@/components/loader/TableLoader';

export function StudentPageLoader() {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <div className='mt-6'>
        <TableLoader />
      </div>
    </section>
  );
}
