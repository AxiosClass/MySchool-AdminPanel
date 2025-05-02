import { Message, PageHeader } from '@/components/shared';
import { PageTitle } from '@/components/shared/PageTitle';
import { AddStudent } from './AddStudent';
import { useQuery } from '@tanstack/react-query';
import { QK } from '@/api';
import { getStudents } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { UserIcon } from '@/components/shared';

import moment from 'moment';
import { dateFormatString } from '@/data';

export default function StudentsPage() {
  return (
    <>
      <PageTitle title='Students' />
      <PageHeader label='Students'>
        <AddStudent />
      </PageHeader>
      <StudentTable />
    </>
  );
}

const StudentTable = () => {
  const { data: students, isLoading } = useQuery({
    queryKey: [QK.STUDENT],
    queryFn: getStudents,
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;
  if (!students?.length) return <Message message='No student found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Guardian</TableHead>
          <TableHead className='text-right'>Admitted At</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {students.map(({ id, name, class: classInfo, classroom, guardian, address, admittedAt }) => {
        return (
          <TableRow key={id} className='border-b'>
            <TableCell>
              <div className='flex gap-4'>
                <UserIcon username={name} />
                <div>
                  <p className='text-base font-semibold'>{name}</p>
                  <p className='text-sm text-muted-foreground'>ID : {id}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className='text-base font-semibold'>Class : {classInfo}</p>
              <p className='text-sm text-muted-foreground'>Section : {classroom.name}</p>
            </TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>
              <p className='text-base font-semibold'> {guardian.name}</p>
              <p className='text-sm text-muted-foreground'>Cell : {guardian.phone}</p>
            </TableCell>
            <TableCell className='text-right capitalize'>{moment(admittedAt).format(dateFormatString.basic)}</TableCell>
          </TableRow>
        );
      })}
    </CommonTable>
  );
};
