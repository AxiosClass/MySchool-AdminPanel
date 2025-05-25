import { SectionCover } from '@/components/shared/section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageTitle } from '@/components/shared';
import { useParams } from 'react-router-dom';
import { AddNote } from '@/components/shared/section/AddNote';

export default function TeacherSection() {
  const { sectionId } = useParams();

  return (
    <>
      <PageTitle title={`Section`} />
      <ScrollArea className='px-6'>
        <SectionCover sectionId={sectionId as string}>
          <AddNote sectionId={sectionId as string} />
        </SectionCover>
      </ScrollArea>
    </>
  );
}
