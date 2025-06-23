import { QK } from '@/api';
import { getDuesByClassroom } from '@/api/query';
import { CardsLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { DueCard } from '../DueCard';
import { useParams } from 'react-router-dom';
import { Message } from '@/components/shared';

export const DueClassDetails = () => {
  const params = useParams();
  const level = params.level as string;

  const { data: classrooms, isLoading } = useQuery({
    queryKey: [QK.DUE, 'BY_CLASSROOM', { level }],
    queryFn: () => getDuesByClassroom(level),
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;
  if (!classrooms?.length) return <Message className='my-12' message='No Classroom Found' />;

  return (
    <section className='m-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {classrooms?.map(({ id, name, classLevel, ...rest }) => (
        <DueCard key={id} id={id} title={`${name} (${classLevel})`} linkPrefix='/dues/section' {...rest} />
      ))}
    </section>
  );
};
