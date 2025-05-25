import { PageWithTableLoader } from '@/components/loader';
import { Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { SubjectTable } from './SubjectTable';
import { useGetClassroomDetails } from '@/hooks';

export default function SectionPage() {
  const { sectionId } = useParams();
  const { data: classroomDetails, isLoading } = useGetClassroomDetails(sectionId as string);

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
