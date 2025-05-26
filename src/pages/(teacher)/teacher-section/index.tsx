import { NoteList, SectionCover } from '@/components/shared/section';
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
        <div className='mt-6' />
        <section className='flex items-center gap-6 pb-6'>
          <NoteList sectionId={sectionId as string} className='max-w-5xl' />
        </section>
      </ScrollArea>
    </>
  );
}
