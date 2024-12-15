import { CardsLoader } from '@/components/loader/CardsLoader';
import { PageHeaderLoader } from '@/components/loader/PageHeaderLoader';

export function ClassDetailsPageLoader() {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <CardsLoader />
    </section>
  );
}
