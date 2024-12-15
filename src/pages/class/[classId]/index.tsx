import { useParams } from 'react-router-dom';
import { ClassroomCard } from './ClassroomCard';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetClassDetailsQuery } from '@/data-fetching/hooks/class';
import { CreateClassroom } from './create-classroom/CreateClassroom';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClassDetailsPageLoader } from './ClassDetailsPageLoader';

export default function ClassDetailsPage() {
  const { classId } = useParams();
  const { data: classData, isLoading, isFetching } = useGetClassDetailsQuery(classId!);

  if (isLoading || isFetching) return <ClassDetailsPageLoader />;

  return (
    <PageTitle title='Class Details'>
      <PageHeader label={`${classData?.data ? 'Class : ' + classData?.data?.name : ''}`} backLink='/classes'>
        <CreateClassroom />
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
