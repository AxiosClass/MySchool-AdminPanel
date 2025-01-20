import { QK } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared/PageTitle';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { FaGraduationCap, FaUserTie } from 'react-icons/fa';
import { getClassDetails } from '@/api/query';
import { ClassDetailsPageLoader } from './ClassDetailsPageLoader';

export default function ClassDetailsPage() {
  const { classId } = useParams();
  const { data: classData, isLoading } = useQuery({
    queryKey: [QK.CLASS, { classId }],
    queryFn: () => getClassDetails(classId as string),
  });

  if (isLoading) return <ClassDetailsPageLoader />;

  return (
    <PageTitle title='Class Details'>
      <PageHeader label={`${classData?.data ? 'Class : ' + classData?.data?.name : ''}`} backLink='/classes'>
        {/* <CreateClassroom /> */}
      </PageHeader>
      {classData?.data?.classrooms && classData?.data.classrooms.length ? (
        <section className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {classData?.data.classrooms.map((classroom) => <ClassroomCard key={classroom.id} {...classroom} />)}
        </section>
      ) : (
        <Message message='No classroom found' />
      )}
    </PageTitle>
  );
}

type TClassroomCardProps = {
  id: string;
  name: string;
  classTeacher: { id: string; name: string };
  students: { id: string }[];
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
