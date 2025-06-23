import { QK } from '@/api';
import { getDuesByStudent, TGetDuesByStudentResult } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { CommonTable, SearchInput, TableNoData } from '@/components/shared';
import { StudentInfoCell } from '@/components/shared/StudentInfoCell';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TUseSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

export const DuesTable = () => {
  const params = useParams();
  const sectionId = params.sectionId as string;
  const { value, onSearchChange } = useSearch();

  const { data: students, isLoading } = useQuery({
    queryKey: [QK.DUE, { sectionId }],
    queryFn: () => getDuesByStudent(sectionId),
    select: (res) => res.data,
  });

  return (
    <CommonTable
      head={<DuesTableHead />}
      header={<DuesTableHeader value={value} onSearchChange={onSearchChange} />}
      tableContainerClassName='m-6'
    >
      <DuesTableBody students={students ?? []} searchTerm={value} isLoading={isLoading} />
    </CommonTable>
  );
};

const DuesTableHead = () => (
  <>
    <TableHead>Student Info</TableHead>
    <TableHead>Section</TableHead>
    <TableHead>Amount</TableHead>
    <TableHead>Actions</TableHead>
  </>
);

type TDuesHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'>;

const DuesTableHeader = ({ value, onSearchChange }: TDuesHeaderProps) => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <SearchInput
        value={value}
        onSearchChange={onSearchChange}
        placeholder='Search by name, id ...'
        className='w-full max-w-sm'
      />
    </div>
  );
};

type TDuesTableBodyProps = { students: TGetDuesByStudentResult; searchTerm: string; isLoading: boolean };

const DuesTableBody = ({ students, searchTerm, isLoading }: TDuesTableBodyProps) => {
  if (isLoading) <TableBodyLoader cols={4} />;
  if (!students.length) return <TableNoData colSpan={4} message='No Student with due found this section' />;

  const filteredStudents = students.filter(
    (student) => student.name.toLowerCase().includes(searchTerm) || student.id.includes(searchTerm),
  );

  if (!filteredStudents.length) return <TableNoData colSpan={4} message='No matched student found' />;

  return filteredStudents.map((std) => <DuesTableRow key={std.id} {...std} />);
};

type TDuesTableRowPops = TGetDuesByStudentResult[number];
const DuesTableRow = memo(({ id, name, classroomName, classLevel, due }: TDuesTableRowPops) => (
  <TableRow>
    <TableCell>
      <StudentInfoCell id={id} name={name} />
    </TableCell>

    <TableCell>
      <p className='text-base font-semibold'>Class : {classLevel}</p>
      <p className='text-sm text-muted-foreground'>Section : {classroomName}</p>
    </TableCell>
    <TableCell className='font-semibold'>{due} TK</TableCell>
    <TableCell></TableCell>
  </TableRow>
));
