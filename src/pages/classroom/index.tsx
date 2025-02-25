import { QK } from '@/api';
import { getClassroomSubjectsWithTeacher, getSubjects } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable, Message, PageHeader, PageTitle, UserIcon } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AssignSubjectTeacher from './AssignSubjectTeacher';

export default function ClassroomPage() {
  return (
    <ScrollArea>
      <PageTitle title='Classroom' />
      <PageHeader label='Classroom'></PageHeader>
      <section className='mt-6 grid grid-cols-2 gap-4 px-6'>
        <SubjectsTable />
      </section>
    </ScrollArea>
  );
}

const SubjectsTable = () => {
  const { classroomId } = useParams();
  const { data: subjectsData, isLoading } = useQuery({
    queryKey: [QK.CLASSROOM, { classroomId }],
    queryFn: () => getClassroomSubjectsWithTeacher(classroomId as string),
    select: (res) => res.data,
  });

  console.log(subjectsData);

  if (isLoading) return <TableLoader />;
  if (!subjectsData || subjectsData.length === 0) return <Message message='No Subjects has been Found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Subject</TableHead>
          <TableHead>Teacher</TableHead>
        </>
      }
      className={{ tableContainer: 'w-fit px-6' }}
    >
      {subjectsData?.map(({ id, name, teacher }, index) => (
        <TableRow className='border-b' key={id}>
          <TableCell>
            <div className='flex gap-4'>
              <p className='text-base font-semibold'>
                {index + 1}. {name}
              </p>
            </div>
          </TableCell>
          <TableCell>
            <div className='flex gap-4'>
              {teacher?.name ? (
                <div className='flex items-center justify-center gap-4'>
                  <UserIcon username={teacher?.name || 'N/A'} />
                  <p className='text-base font-semibold'>{teacher?.name}</p>
                </div>
              ) : (
                <AssignSubjectTeacher classroomId={classroomId as string} classSubjectId={id} />
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
