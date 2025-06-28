import moment from 'moment';

import { QK } from '@/api';
import { UserIcon } from '@/components/shared/UserIcon';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableBodyLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { getTeachers, TGetTeachersResult } from '@/api/query';
import { AddTeacher } from './AddTeacher';
import { dateFormatString } from '@/data';
import { Pagination, PasswordReset, SearchInput, TableNoData, usePagination } from '@/components/shared';
import { TUseSearch, useSearch } from '@/hooks';
import { UpdateTeacher } from './UpdateTeacher';
import { memo } from 'react';
import { DeleteTeacher } from './DeleteTeacher';
import { USER_ROLE } from '@/lib/types';

const LIMIT = '10';
export const TeacherTable = () => {
  const { value, onSearchChange, searchTerm } = useSearch();
  const { page, onPageChange } = usePagination();

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: [QK.TEACHER, { searchTerm, LIMIT, page }],
    queryFn: () => getTeachers({ searchTerm, limit: LIMIT, page: page.toString() }),
    select: (res) => ({ teacher: res.data, meta: res.meta }),
  });

  return (
    <CommonTable
      header={<TeacherTableHeader value={value} onSearchChange={onSearchChange} />}
      head={<TeacherTableHead />}
      footer={
        <Pagination page={page} onPageChange={onPageChange} totalPages={apiResponse?.meta?.totalPages ?? 0} />
      }
      tableContainerClassName='px-6 mt-6'
    >
      <TeacherTableBody teachers={apiResponse?.teacher ?? []} isLoading={isLoading} />
    </CommonTable>
  );
};

type TTeacherTableHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'>;
const TeacherTableHeader = ({ value, onSearchChange }: TTeacherTableHeaderProps) => (
  <div className='flex items-center justify-between'>
    <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search by name, phone ...' />
    <AddTeacher />
  </div>
);

const TeacherTableHead = () => (
  <>
    <TableHead>Teacher Info</TableHead>
    <TableHead>Phone</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Salary</TableHead>
    <TableHead>Joined at</TableHead>
    <TableHead className='text-center'>Actions</TableHead>
  </>
);

type TTeacherTableBodyProps = { teachers: TGetTeachersResult; isLoading: boolean };
const TeacherTableBody = ({ teachers, isLoading }: TTeacherTableBodyProps) => {
  if (isLoading) return <TableBodyLoader cols={6} />;
  if (!teachers?.length) return <TableNoData colSpan={6} message='No Teacher Found' />;

  return teachers.map((teacher) => <TeacherTableRow key={teacher.id} {...teacher} />);
};

type TTeacherTableRowProps = TGetTeachersResult[number];
const TeacherTableRow = memo((props: TTeacherTableRowProps) => {
  const { id, name, salary, joinedAt, phone, classroomName, classLevel } = props;

  return (
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
          <p className='font-semibold'>{classroomName ? `${classroomName} (${classLevel})` : 'N/A'}</p>
        </div>
      </TableCell>
      <TableCell>{salary} TK</TableCell>
      <TableCell>{moment(joinedAt).format(dateFormatString.basic)}</TableCell>
      <TableCell>
        <div className='flex items-center justify-center gap-2'>
          <UpdateTeacher teacherId={id} />
          <PasswordReset id={id} role={USER_ROLE.TEACHER} />
          <DeleteTeacher teacherId={id} />
        </div>
      </TableCell>
    </TableRow>
  );
});

TeacherTableRow.displayName = 'TeacherTableRow';
