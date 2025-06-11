import { QK } from '@/api';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClassroomAttendanceList } from './ClassroomAttendanceList';
import { NoteList, SectionCover, AddNote } from '@/components/shared/section';
import { PageTitle } from '@/components/shared';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOngoingTerm } from '@/api/query';
import { useGetTeacherSubjects } from '@/hooks';
import { AddGrade } from './add-grade';

export default function TeacherSection() {
  const params = useParams();
  const sectionId = params.sectionId as string;

  const { data: term } = useQuery({
    queryKey: [QK.TERM, { status: 'ongoing' }],
    queryFn: getOngoingTerm,
    select: (res) => res.data,
  });

  const { data: subjects } = useGetTeacherSubjects(sectionId);

  return (
    <>
      <PageTitle title={`Section`} />
      <ScrollArea className='p-6'>
        <SectionCover sectionId={sectionId}>
          <div className='ml-auto flex items-center gap-4'>
            {!!term?.id && !!subjects?.length && <AddGrade sectionId={sectionId} termId={term.id} />}
            <AddNote sectionId={sectionId} />
          </div>
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
