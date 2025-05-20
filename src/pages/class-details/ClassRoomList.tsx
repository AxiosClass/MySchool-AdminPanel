import { TGetClassDetails } from '@/api/query';
import { Message } from '@/components/shared';
import { ClassroomCard } from '@/components/shared/ClassroomCard';

export const ClassRoomList = ({ classrooms }: { classrooms: TGetClassDetails['classrooms'] }) => {
  if (!classrooms.length) return <Message message='No Classrooms Found!' />;

  return (
    <section className='grid gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} {...classroom} linkPrefix='/classroom' />
      ))}
    </section>
  );
};
