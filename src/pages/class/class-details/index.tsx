import { QK } from '@/api';
import { getClassDetails } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared/PageTitle';
import { CreateClassroom } from './CreateClassroom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageWithCardLoader } from '@/components/loader';
import { ClassRoomList } from './ClassRoomList';
import { AssignSubjects } from './assign-subjects';

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
        <div className='flex items-center gap-2'>
          <AssignSubjects classId={classId!} />
          <CreateClassroom />
        </div>
      </PageHeader>
      <ClassRoomList classrooms={classData.classrooms} />
    </ScrollArea>
  );
}
