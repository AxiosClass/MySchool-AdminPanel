import { QK } from '@/api';
import { getClassDetails, TGetClassDetails } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Message } from '@/components/shared/Message';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { CreateClassroom } from './CreateClassroom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageWithCardLoader } from '@/components/loader/PageWithCardLoader';

export default function ClassDetailsPage() {
  const { classId } = useParams();
  const { data: classData, isLoading } = useQuery({
    queryKey: [QK.CLASS, { classId }],
    queryFn: () => getClassDetails(classId as string),
    select: (res) => res.data,
  });

  if (isLoading) return <PageWithCardLoader />;
  if (!classData) return <Message message='No Class Found!' />;

  return (
    <ScrollArea>
      <PageTitle title='Class Details' />
      <PageHeader label={`${classData ? 'Class : ' + classData.name : ''}`} backLink='/classes'>
        <CreateClassroom />
      </PageHeader>
      <ClassroomList classrooms={classData.classrooms} />
    </ScrollArea>
  );
}

const ClassroomList = ({ classrooms }: { classrooms: TGetClassDetails['classrooms'] }) => {
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

// types
type TClassroomCardProps = {
  id: string;
  name: string;
  classTeacher: { id: string; name: string };
  students: { id: string }[];
};
