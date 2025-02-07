import { CardsLoader } from '@/components/loader/CardsLoader';
import { PageHeaderLoader } from '@/components/loader/PageHeaderLoader';

export const ClassesPageLoader = () => {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <CardsLoader />
    </section>
  );
};
