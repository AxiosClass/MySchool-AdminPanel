import { ScrollArea } from '@/components/ui/scroll-area';
import { NoteList, SectionCover, AddNote } from '@/components/shared/section';
import { PageTitle } from '@/components/shared';
import { useParams } from 'react-router-dom';

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
        <section className='flex gap-6 pb-6'>
          <NoteList sectionId={sectionId as string} className='grow' />
          <section className='w-[500px]'></section>
        </section>
      </ScrollArea>
    </>
  );
}
