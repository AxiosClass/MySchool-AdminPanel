import { CardsLoader } from './CardsLoader';
import { PageHeaderLoader } from './PageHeaderLoader';

export const PageWithCardLoader = () => {
  return (
    <section className='my-6'>
      <PageHeaderLoader />
      <CardsLoader />
    </section>
  );
};
