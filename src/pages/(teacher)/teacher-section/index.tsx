import { ScrollArea } from '@/components/ui/scroll-area';
import { NoteList, SectionCover, AddNote } from '@/components/shared/section';
import { PageTitle } from '@/components/shared';
import { useParams } from 'react-router-dom';
import { ClassroomAttendanceList } from './ClassroomAttendanceList';

export default function TeacherSection() {
  const params = useParams();
  const sectionId = params.sectionId as string;

  return (
    <>
      <PageTitle title={`Section`} />
      <ScrollArea className='p-6'>
        <SectionCover sectionId={sectionId}>
          <AddNote sectionId={sectionId} />
        </SectionCover>
        <section className='mt-6 flex grow gap-6 pb-6'>
          <NoteList sectionId={sectionId} className='grow' />
          <section className='w-[550px]'>
            <ClassroomAttendanceList sectionId={sectionId} />
          </section>
        </section>
      </ScrollArea>
    </>
  );
}
