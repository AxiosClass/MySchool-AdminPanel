import moment from 'moment';

import { QK } from '@/api';
import { TUseSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TableBodyLoader } from '@/components/loader';
import { Pagination, PasswordReset, SearchInput, TableNoData, usePagination } from '@/components/shared';
import { getClassList, getStudents, TGetStudentSResult } from '@/api/query';
import { dateFormatString } from '@/data';
import { AddStudent } from './AddStudent';
import { IssueNfcCard } from './IssueNfcCard';
import { memo, useCallback, useState } from 'react';
import { CommonSelect } from '@/components/shared/form';
import { UpdateStudent } from './UpdateStudent';
import { USER_ROLE } from '@/lib/types';
import { StudentInfoCell } from '@/components/shared/StudentInfoCell';

const LIMIT = '10';
export const StudentTable = () => {
  const [classLevel, setClassLevel] = useState('all');
  const { value, searchTerm, onSearchChange } = useSearch();
  const { page, onPageChange } = usePagination();

  const onClassChangeLevelChange = useCallback((level: string) => setClassLevel(level), []);

  const { data, isLoading } = useQuery({
    queryKey: [QK.STUDENT, { searchTerm, page, LIMIT, classLevel }],
    queryFn: () =>
      getStudents({
        searchTerm,
        page: page.toString(),
        limit: LIMIT,
        ...(classLevel !== 'all' && { classLevel }),
      }),
    select: (res) => ({ students: res.data, meta: res.meta }),
  });

  return (
    <CommonTable
      head={<StudentTableHead />}
      header={
        <StudentTableHeader
          value={value}
          onSearchChange={onSearchChange}
          classLevel={classLevel}
          onClassLevelChange={onClassChangeLevelChange}
        />
      }
      footer={<Pagination page={page} onPageChange={onPageChange} totalPages={data?.meta?.totalPages ?? 0} />}
      tableContainerClassName='px-6 mt-6'
    >
      <TStudentTableBody students={data?.students || []} isLoading={isLoading} />
    </CommonTable>
  );
};

const StudentTableHead = () => (
  <>
    <TableHead>Student Info</TableHead>
    <TableHead>Class</TableHead>
    <TableHead>Address</TableHead>
    <TableHead>Guardian</TableHead>
    <TableHead>Admitted At</TableHead>
    <TableHead className='text-center'>Action</TableHead>
  </>
);

type TStudentTableHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'> & {
  classLevel: string;
  onClassLevelChange: (level: string) => void;
};

const StudentTableHeader = ({
  value,
  onSearchChange,
  classLevel,
  onClassLevelChange,
}: TStudentTableHeaderProps) => {
  const { data: classOptions } = useQuery({
    queryKey: [QK.CLASS, 'LIST'],
    queryFn: getClassList,
    select: (res) => {
      const classOptions = [{ label: 'All', value: 'all' }];
      res.data
        .sort((a, b) => Number(a.level) - Number(b.level))
        .forEach((cls) => classOptions.push({ label: cls.name, value: cls.level }));
      return classOptions;
    },
  });

  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex items-center gap-4'>
        <SearchInput
          className='shrink-0'
          value={value}
          onSearchChange={onSearchChange}
          placeholder='Search by id, name..'
        />
        <CommonSelect
          className='min-w-40'
          options={classOptions || []}
          value={classLevel}
          onChange={onClassLevelChange}
        />
      </div>

      <AddStudent />
    </div>
  );
};

type TStudentTableBodyProps = { students: TGetStudentSResult; isLoading: boolean };
const TStudentTableBody = ({ students, isLoading }: TStudentTableBodyProps) => {
  if (isLoading) return <TableBodyLoader cols={6} />;
  if (!students?.length) return <TableNoData message={'No Student found'} colSpan={6} />;

  return students.map((student) => <StudentTableRow key={student.id} {...student} />);
};

type TStudentTableRowProps = TGetStudentSResult[number];
const StudentTableRow = memo((props: TStudentTableRowProps) => {
  const { id, name, cardId, class: cls, classroomName, address, guardian, admittedAt } = props;

  return (
    <TableRow>
      <TableCell>
        <StudentInfoCell id={id} name={name} cardId={cardId} />
      </TableCell>
      <TableCell>
        <p className='text-base font-semibold'>Class : {cls}</p>
        <p className='text-sm text-muted-foreground'>Section : {classroomName}</p>
      </TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>
        <p className='text-base font-semibold'> {guardian.name}</p>
        <p className='text-sm text-muted-foreground'>Cell : {guardian.phone}</p>
      </TableCell>
      <TableCell>{moment(admittedAt).format(dateFormatString.basic)}</TableCell>
      <TableCell>
        <div className='flex items-center justify-center gap-2'>
          <UpdateStudent studentId={id} />
          <IssueNfcCard studentId={id} cardId={cardId} />
          <PasswordReset id={id} role={USER_ROLE.STUDENT} />
        </div>
      </TableCell>
    </TableRow>
  );
});

StudentTableRow.displayName = 'StudentTableRow';
