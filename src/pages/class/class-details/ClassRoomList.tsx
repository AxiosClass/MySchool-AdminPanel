import { TGetClassDetails } from '@/api/query';
import { Message } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGraduationCap, FaUserTie } from 'react-icons/fa';

export const ClassRoomList = ({ classrooms }: { classrooms: TGetClassDetails['classrooms'] }) => {
  if (!classrooms.length) return <Message message='No Classrooms Found!' />;

  return (
    <section className='grid gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {classrooms.map((classroom) => (
        <ClassroomCard key={classroom.id} {...classroom} />
      ))}
    </section>
  );
};

const ClassroomCard = ({ name, classTeacher, students }: TClassroomCardProps) => {
  return (
    <Card className='border-primary-100 bg-transparent'>
      <CardHeader className='px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>{name}</CardTitle>
      </CardHeader>
      <CardContent className='mt-2'>
        <div className='flex items-center gap-3'>
          <FaUserTie size={18} /> <p className='font-semibold'>{classTeacher.name}</p>
        </div>
        <div className='mt-2 flex items-center gap-3'>
          <FaGraduationCap size={20} /> <p className='font-semibold'> Total Students : {students.length}</p>
        </div>
      </CardContent>
    </Card>
  );
};

type TClassroomCardProps = {
  id: string;
  name: string;
  classTeacher: { id: string; name: string };
  students: { id: string }[];
};
