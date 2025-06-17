import { StudentProfileSkeleton } from '@/components/loader';
import { Message, PageTitle } from '@/components/shared';
import { AttendanceList } from '@/components/shared/attendance';
import { StudentProfile } from '@/components/shared/student-profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetStudentInfo } from '@/hooks';
import { useParams } from 'react-router-dom';

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;

  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId);

  if (isLoading) return <StudentProfileSkeleton />;
  if (!studentInfo) return <Message message='Student Not Found' />;

  return (
    <>
      <PageTitle title='Student Profile' />
      <ScrollArea className='px-6'>
        <section className='my-6 space-y-6'>
          <StudentProfile {...studentInfo} showPaymentInfo />
          <AttendanceList studentId={studentId} admittedAt={studentInfo.admittedAt} />
        </section>
      </ScrollArea>
    </>
  );
}
