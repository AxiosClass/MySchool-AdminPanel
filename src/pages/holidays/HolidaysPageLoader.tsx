import { PageHeaderLoader } from '@/components/loader/PageHeaderLoader';
import { TableLoader } from '@/components/loader/TableLoader';

export const HolidaysPageLoader = () => {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <div className='mt-6'>
        <TableLoader />
      </div>
    </section>
  );
};
