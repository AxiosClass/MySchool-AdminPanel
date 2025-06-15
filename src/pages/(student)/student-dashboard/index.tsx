import { Message, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuthStore } from '@/stores/auth';
import { useGetStudentInfo } from '@/hooks';
import { StudentProfile } from '@/components/shared/student-profile';
import { AttendanceList } from '@/components/shared/attendance';
import { StudentProfileSkeleton } from '@/components/loader';

export default function StudentDashboardPage() {
  const userId = useAuthStore((state) => state.user?.id as string);
  const { data: studentInfo, isLoading } = useGetStudentInfo(userId);

  if (isLoading) return <StudentProfileSkeleton />;
  if (!studentInfo) return <Message message='Student Not Found' />;

  return (
    <>
      <PageTitle title='Student Profile' />
      <ScrollArea className='px-6'>
        <section className='my-6 space-y-6'>
          <StudentProfile {...studentInfo} showPaymentInfo />
          <AttendanceList studentId={userId} admittedAt={studentInfo.admittedAt} />
        </section>
      </ScrollArea>
    </>
  );
}
