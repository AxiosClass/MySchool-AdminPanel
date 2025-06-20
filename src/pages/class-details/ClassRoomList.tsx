import { TGetClassDetails } from '@/api/query';
import { Message } from '@/components/shared';
import { SectionCard } from '@/components/shared/section';

export const ClassRoomList = ({ classrooms }: { classrooms: TGetClassDetails['classrooms'] }) => {
  if (!classrooms.length) return <Message message='No Classrooms Found!' />;

  return (
    <section className='grid gap-6 px-6 sm:grid-cols-2 md:grid-cols-3'>
      {classrooms.map((classroom) => (
        <SectionCard key={classroom.id} {...classroom} linkPrefix='/section' canModify />
      ))}
    </section>
  );
};
