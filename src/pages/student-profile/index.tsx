import { StudentProfileSkeleton } from '@/components/loader';
import { MakePayment, Message, PageTitle } from '@/components/shared';
import { AttendanceList, StudentAttendanceSummary } from '@/components/shared/attendance';
import { GiveDiscount } from '@/components/shared/give-discount';
import { PromoteStudent } from '@/components/shared/promote-student';
import { YearPicker } from '@/components/shared/result-summary';
import { TermSummaryFetcher } from '@/components/shared/result-summary/TermSummaryFetcher';
import { StudentProfile } from '@/components/shared/student-profile';
import { Card, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getYearsFromDateToNow } from '@/helpers';
import { useGetStudentInfo } from '@/hooks';
import { USER_ROLE } from '@/lib/types';
import { useAuthStore } from '@/stores/auth';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

const adminRoles = [USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN];

export default function StudentProfilePage() {
  const params = useParams();
  const role = useAuthStore((state) => state.user?.role as USER_ROLE);

  const studentId = params.studentId as string;
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
                <PromoteStudent studentId={studentId} />
                <GiveDiscount studentId={studentId} />
                <MakePayment studentId={studentId} />
              </div>
            )}
          </StudentProfile>

          <StudentAttendanceSummary studentId={studentId} />
          <AttendanceList studentId={studentId} admittedAt={studentInfo.admittedAt} />
          <StudentResult studentId={studentId} admittedAt={studentInfo.admittedAt} />
        </section>
      </ScrollArea>
    </>
  );
}

const StudentResult = ({ studentId, admittedAt }: { studentId: string; admittedAt: string }) => {
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const onYearChange = useCallback((year: string) => setYear(year), []);

  const years = getYearsFromDateToNow(admittedAt);

  return (
    <section className='space-y-4'>
      <Card className='w-full bg-white'>
        <CardHeader className='flex flex-row items-center justify-between rounded-xl'>
          <h2 className='text-xl font-semibold'>Academic Result of : {year}</h2>
          <YearPicker year={year} onYearChange={onYearChange} years={years} />
        </CardHeader>
      </Card>

      <TermSummaryFetcher
        tableContainerClass='px-0 bg-white'
        tableHeaderClass='bg-white'
        studentId={studentId}
        year={year}
      />
    </section>
  );
};
