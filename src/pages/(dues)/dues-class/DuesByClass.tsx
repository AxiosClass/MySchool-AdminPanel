import { QK } from '@/api';
import { getDuesByClass } from '@/api/query';
import { CardsLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { DueCard } from '../DueCard';

export const DuesByClass = () => {
  const { data: classes, isLoading } = useQuery({
    queryKey: [QK.DUE, 'BY_CLASS'],
    queryFn: getDuesByClass,
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;

  return (
    <section className='m-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {classes?.map(({ level, name, ...rest }) => (
        <DueCard key={level} id={level} title={`${name}`} linkPrefix='/dues/class' {...rest} />
      ))}
    </section>
  );
};
