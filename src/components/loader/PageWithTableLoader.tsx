import { PageHeaderLoader } from './PageHeaderLoader';
import { TableLoader } from './TableLoader';

export const PageWithTableLoader = () => (
  <section className='my-6'>
    <PageHeaderLoader />
    <div className='mt-6'>
      <TableLoader />
    </div>
  </section>
);
