import { QK } from '@/api';
import { getClassroomDetails } from '@/api/query';
import { PageWithTableLoader } from '@/components/loader';
import { Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { SubjectTable } from './SubjectTable';

export default function SectionPage() {
  const { sectionId } = useParams();

  const { data: classroomDetails, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { classroomId: sectionId }],
    queryFn: () => getClassroomDetails(sectionId as string),
    select: (res) => res.data,
    enabled: !!sectionId,
  });

  if (isLoading) return <PageWithTableLoader />;
  if (!classroomDetails) return <Message message='Section does not exist' className='my-6' />;

  return (
    <>
      <PageTitle title='Section' />
      <ScrollArea>
        <PageHeader label={`Section : ${classroomDetails?.name} (${classroomDetails?.level})`} />
        <SubjectTable sectionId={sectionId as string} />
      </ScrollArea>
    </>
  );
}
