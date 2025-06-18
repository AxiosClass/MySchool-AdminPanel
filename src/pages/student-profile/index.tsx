import { StudentProfileSkeleton } from '@/components/loader';
import { MakePayment, Message, PageTitle } from '@/components/shared';
import { AttendanceList } from '@/components/shared/attendance';
import { GiveDiscount } from '@/components/shared/give-discount';
import { StudentProfile } from '@/components/shared/student-profile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetStudentInfo } from '@/hooks';
import { USER_ROLE } from '@/lib/types';
import { useAuthStore } from '@/stores/auth';
import { useParams } from 'react-router-dom';

const adminRoles = [USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN];

export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;

  const role = useAuthStore((state) => state.user?.role as USER_ROLE);
  const isAdmin = adminRoles.includes(role);

  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId);

  if (isLoading) return <StudentProfileSkeleton />;
  if (!studentInfo) return <Message message='Student Not Found' />;

  return (
    <>
      <PageTitle title='Student Profile' />
      <ScrollArea className='px-6'>
        <section className='my-6 space-y-6'>
          <StudentProfile {...studentInfo} showPaymentInfo>
            {isAdmin && (
              <div className='ml-auto flex items-center gap-4'>
                <GiveDiscount studentId={studentId} />
                <MakePayment studentId={studentId} />
              </div>
            )}
          </StudentProfile>
          <AttendanceList studentId={studentId} admittedAt={studentInfo.admittedAt} />
        </section>
      </ScrollArea>
    </>
  );
}
