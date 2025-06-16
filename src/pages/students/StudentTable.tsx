import moment from 'moment';

import { QK } from '@/api';
import { TUserSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { getStudents, TGetStudentSResult } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Pagination, SearchInput, TableNoData, usePagination, UserIcon } from '@/components/shared';
import { dateFormatString } from '@/data';
import { AddStudent } from './AddStudent';
import { IssueNfcCard } from './IssueNfcCard';

export const StudentTable = () => {
  const { value, searchTerm, onSearchChange } = useSearch();
  const { page, onPageChange } = usePagination();
  const LIMIT = '10';

  const { data, isLoading } = useQuery({
    queryKey: [QK.STUDENT, { searchTerm, page, LIMIT }],
    queryFn: () => getStudents({ searchTerm, page: page.toString(), limit: LIMIT }),
    select: (res) => ({ students: res.data, meta: res.meta }),
  });

  return (
    <CommonTable
      head={<StudentTableHead />}
      header={<StudentTableHeader value={value} onSearchChange={onSearchChange} />}
      footer={<Pagination page={page} onPageChange={onPageChange} totalPages={data?.meta?.totalPages ?? 0} />}
      tableContainerClassName='px-6 mt-6'
    >
      <TStudentTableBody students={data?.students || []} isLoading={isLoading} />
    </CommonTable>
  );
};

type TStudentTableHeaderProps = Pick<TUserSearch, 'value' | 'onSearchChange'>;

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

const StudentTableHeader = ({ value, onSearchChange }: TStudentTableHeaderProps) => (
  <div className='flex items-center justify-between gap-4'>
    <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search by id, name..' />
    <AddStudent />
  </div>
);

type TStudentTableBodyProps = { students: TGetStudentSResult; isLoading: boolean };

const TStudentTableBody = ({ students, isLoading }: TStudentTableBodyProps) => {
  if (isLoading) return <TableBodyLoader cols={6} />;
  if (!students?.length) return <TableNoData message={'No Student found'} colSpan={6} />;

  return students.map((student) => <StudentTableRow key={student.id} {...student} />);
};

type TStudentTableRowProps = TGetStudentSResult[number];

const StudentTableRow = ({
  id,
  name,
  cardId,
  class: cls,
  classroomName,
  address,
  admittedAt,
  guardian,
}: TStudentTableRowProps) => (
  <TableRow key={id} className='border-b'>
    <TableCell>
      <div className='flex gap-4'>
        <UserIcon username={name} />
        <div>
          <p className='text-base font-semibold'>{name}</p>
          <p className='text-sm text-muted-foreground'>ID : {id}</p>
          {cardId && <p className='text-sm text-muted-foreground'>CardID : {cardId}</p>}
        </div>
      </div>
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
      <IssueNfcCard key={cardId} studentId={id} cardId={cardId} />
    </TableCell>
  </TableRow>
);
