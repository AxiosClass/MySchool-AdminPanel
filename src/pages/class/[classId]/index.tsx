import {
  GET_CLASSROOM_BY_CLASS_ID,
  IGetClassroomByClassIdArgs,
  IGetClassroomByClassIdResponse,
} from '@/lib/queries';

import { Message, PageTitle } from '@/components/shared';
import { CreateClassroom } from './create-classroom';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClassroomCard } from './ClassroomCard';
import { TiArrowBack } from 'react-icons/ti';
import { useQuery } from '@apollo/client';

export default function ClassDetailsPage() {
  const { classId } = useParams();

  const { data: classRoomsData, loading: isLoading } = useQuery<
    IGetClassroomByClassIdResponse,
    IGetClassroomByClassIdArgs
  >(GET_CLASSROOM_BY_CLASS_ID, { variables: { classId: classId as string } });

  if (isLoading) return 'Loading';

  return (
    <PageTitle title='Class Details'>
      <main>
        <div className='flex items-center gap-4'>
          <Link to={'/classes'}>
            <Button className='h-10 w-10 text-white'>
              <span className='text-2xl'>
                <TiArrowBack />
              </span>
            </Button>
          </Link>
          <p className='text-3xl font-semibold'>Class : 1</p>
          <div className='ml-auto'>
            <CreateClassroom />
          </div>
        </div>

        {classRoomsData?.classrooms && classRoomsData.classrooms.length ? (
          <section className='mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {classRoomsData.classrooms.map((classroom) => (
              <ClassroomCard key={classroom.id} {...classroom} />
            ))}
          </section>
        ) : (
          <Message message='No classroom found' />
        )}
      </main>
    </PageTitle>
  );
}
