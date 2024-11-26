import { ClassroomCard } from './ClassroomCard';
import { Button } from '@/components/ui/button';
import { ArrowBigLeftDashIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetClassDetails } from '@/data-fetching/hooks/class';

export default function ClassDetailsPage() {
  const { classId } = useParams();
  const { data: classData, isLoading } = useGetClassDetails(classId!);

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Class Details'>
      <section className='mt-6 flex items-center gap-4'>
        <Link to={'/classes'}>
          <Button className='h-10 w-10 text-white'>
            <span className='text-xl'>
              <ArrowBigLeftDashIcon />
            </span>
          </Button>
        </Link>
        {classData?.data && <p className='text-3xl font-semibold'>Class : {classData?.data?.name}</p>}
        <div className='ml-auto'>{/* <CreateClassroom /> */}</div>
      </section>

      {classData?.data?.classrooms && classData?.data.classrooms.length ? (
        <section className='mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classData?.data.classrooms.map((classroom) => <ClassroomCard key={classroom.id} {...classroom} />)}
        </section>
      ) : (
        <Message message='No classroom found' />
      )}
    </PageTitle>
  );
}
