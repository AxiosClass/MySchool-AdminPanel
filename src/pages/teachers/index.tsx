import { QK } from '@/api';
import { format } from 'date-fns';
import { Message } from '@/components/shared/Message';
import { UserIcon } from '@/components/shared/UserIcon';
import { PageTitle } from '@/components/shared/PageTitle';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable } from '@/components/shared/CommonTable';
import { PageHeader } from '@/components/shared/PageHeader';
import { TableLoader } from '@/components/loader/TableLoader';
import { useQuery } from '@tanstack/react-query';
import { getTeachers } from '@/api/query';
import { AddTeacher } from './AddTeacher';

export default function TeachersPage() {
  return (
    <>
      <PageTitle title='Teachers' />
      <PageHeader label='Teachers'>
        <AddTeacher />
      </PageHeader>
      <TeacherTable />
    </>
  );
}

const TeacherTable = () => {
  const { data: teachersData, isLoading } = useQuery({ queryKey: [QK.TEACHER], queryFn: getTeachers });

  if (isLoading) return <TableLoader />;
  if (!teachersData || teachersData.data.length === 0) return <Message message='No Teacher Found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Teacher Info</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead className='text-right'>Joined at</TableHead>
        </>
      }
    >
      {teachersData.data.map(({ id, name, salary, joinedAt, classroomsClassTeacher, phone }) => (
        <TableRow className='border-b' key={id}>
          <TableCell>
            <div className='flex gap-4'>
              <UserIcon username={name} />
              <div>
                <p className='text-base font-semibold'>{name}</p>
                <p className='text-sm text-muted-foreground'>ID : {id}</p>
              </div>
            </div>
          </TableCell>
          <TableCell>{phone}</TableCell>
          <TableCell>
            <div>
              <p className='text-base font-semibold'>
                {classroomsClassTeacher?.length > 0 ? (
                  <>
                    {classroomsClassTeacher?.[0]?.name} ({classroomsClassTeacher[0]?.class?.level})
                  </>
                ) : (
                  <>N/A</>
                )}
              </p>
            </div>
          </TableCell>
          <TableCell>{salary} TK</TableCell>
          <TableCell className='text-right capitalize'>{format(joinedAt, 'PPP')}</TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
