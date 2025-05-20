import { QK } from '@/api';
import { getAttendancesForClassroom } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AttendanceTable } from '@/components/shared';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileTextIcon } from 'lucide-react';

export default function TeacherClassroom() {
  const { classroomId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetAttendances(classroomId!);

  if (isLoading) return <TableLoader className='my-6' />;
  if (!data) return <Message message='No Classroom Found' />;

  return (
    <>
      <PageTitle title={`Section - ${data.classroomInfo?.name}`} />
      <div className='flex items-center justify-between'>
        <PageHeader label={`${data.classroomInfo?.name}`} />
        <Button
          onClick={() => navigate(`/teacher/classroom/${classroomId}/notes`)}
          className='mx-4 flex items-center gap-2 bg-primary text-white'
        >
          <FileTextIcon className='size-4' />
          View Notes
        </Button>
      </div>
      <ScrollArea>
        <AttendanceTable attendanceList={data.attendanceList} />
      </ScrollArea>
    </>
  );
}

// Hooks
const range = 7;
const useGetAttendances = (classroomId: string) => {
  return useQuery({
    queryKey: [QK.ATTENDANCE, { classroomId, range }],
    queryFn: () => getAttendancesForClassroom({ classroomId, range }),
    enabled: !!classroomId,
    select: (res) => res.data,
  });
};

// types
export type TGetAttendanceQueryResult = ReturnType<typeof useGetAttendances>;
