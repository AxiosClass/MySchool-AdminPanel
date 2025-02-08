import { QK } from '@/api';
import { PageTitle, PageHeader, Message } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { CardsLoader } from '@/components/loader';
import { getClasses } from '@/api/query';
import { CreateClass } from './CreateClass';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';
import { TGetClassResponse } from '@/api/query';

export default function ClassesPage() {
  return (
    <ScrollArea>
      <PageTitle title='Classes' />
      <PageHeader label='Classes'>
        <CreateClass />
      </PageHeader>
      <ClassList />
    </ScrollArea>
  );
}

const ClassList = () => {
  const { data: classesData, isLoading } = useQuery({ queryKey: [QK.CLASS], queryFn: getClasses });

  if (isLoading) return <CardsLoader className={{ card: 'h-36' }} />;
  if (!classesData?.data.length) return <Message message='No Class Found!' />;

  return (
    <section className='grid gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {classesData.data.map((eachClass) => (
        <ClassCard key={eachClass.id} {...eachClass} />
      ))}
    </section>
  );
};

const ClassCard = ({ name, level, id, classrooms }: TGetClassResponse) => {
  const totalStudents = classrooms?.reduce((count, classroom) => {
    count += classroom.students?.length || 0;
    return count;
  }, 0);

  return (
    <Link to={`/class/${id}`}>
      <Card className='border-primary-100 bg-transparent'>
        <CardHeader className='flex flex-row items-center gap-6'>
          <CardTitle className='text-xl'>Class : {name}</CardTitle>
          <span className='ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-white'>
            {level}
          </span>
        </CardHeader>
        <CardContent>
          <p className='flex items-center gap-2 font-semibold'>
            <FaUserGraduate className='size-4' /> Students : {totalStudents}
          </p>
          <p className='mt-2 flex items-center gap-2 font-semibold'>
            <FaBuilding className='size-4' />
            Sections: {classrooms?.length || 0}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
