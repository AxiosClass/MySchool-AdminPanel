import moment from 'moment';

import { QK } from '@/api';
import { UserIcon } from '@/components/shared/UserIcon';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableBodyLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { getTeachers } from '@/api/query';
import { AddTeacher } from './AddTeacher';
import { dateFormatString } from '@/data';
import { SearchInput, TableNoData } from '@/components/shared';

export const TeacherTable = () => (
  <CommonTable header={<TeacherTableHeader />} head={<TeacherTableHead />} tableContainerClassName='p-6'>
    <TeacherTableBody />
  </CommonTable>
);

const TeacherTableHeader = () => (
  <div className='flex items-center justify-between'>
    <SearchInput value='' onSearchChange={() => {}} placeholder='Search by name, phone ...' />
    <AddTeacher />
  </div>
);

const TeacherTableHead = () => (
  <>
    <TableHead>Teacher Info</TableHead>
    <TableHead>Phone</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Salary</TableHead>
    <TableHead className='text-right'>Joined at</TableHead>
  </>
);

const TeacherTableBody = () => {
  const { data: teachersData, isLoading } = useQuery({
    queryKey: [QK.TEACHER],
    queryFn: getTeachers,
    select: (res) => res.data,
  });

  if (isLoading) return <TableBodyLoader cols={5} />;
  if (!teachersData?.length) return <TableNoData colSpan={5} message='No Teacher Found' />;

  return teachersData.map(({ id, name, salary, joinedAt, classroomsClassTeacher, phone }) => (
    <TableRow key={id}>
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
      <TableCell className='text-right capitalize'>{moment(joinedAt).format(dateFormatString.basic)}</TableCell>
    </TableRow>
  ));
};
