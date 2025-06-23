import { QK } from '@/api';
import { getDuesByClassroom } from '@/api/query';
import { CardsLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { DueCard } from '../DueCard';

export const DueByClassroom = () => {
  const { data: classrooms, isLoading } = useQuery({
    queryKey: [QK.DUE, 'BY_CLASSROOM'],
    queryFn: getDuesByClassroom,
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;

  return (
    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {classrooms?.map(({ id, name, classLevel, ...rest }) => (
        <DueCard key={id} id={id} title={`${name} (${classLevel})`} linkPrefix='/dues/classes' {...rest} />
      ))}
    </section>
  );
};
