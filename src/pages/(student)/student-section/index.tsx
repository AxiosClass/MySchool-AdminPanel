import { PageWithCardLoader } from '@/components/loader';
import { Message, PageTitle } from '@/components/shared';
import { NoteList, SectionCover } from '@/components/shared/section';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetStudentInfo } from '@/hooks';
import { useAuthStore } from '@/stores/auth';

export default function StudentSection() {
  const studentId = useAuthStore((state) => state.user?.id as string);
  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId);

  if (isLoading) return <PageWithCardLoader />;
  if (!studentInfo?.classroomId) return <Message className='my-6' message='No Section found' />;

  return (
    <>
      <PageTitle title={`Section`} />
      <ScrollArea>
        <div className='p-6'>
          <SectionCover sectionId={studentInfo?.classroomId} />
          <div className='mt-6 space-y-4'>
            <NoteList sectionId={studentInfo.classroomId} />
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
