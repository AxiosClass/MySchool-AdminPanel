import { QK } from '@/api';
import { getDuesByStudent, TGetDuesByStudentResult } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { CommonTable, MakePayment, SearchInput, TableNoData } from '@/components/shared';
import { GiveDiscount } from '@/components/shared/give-discount';
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
    <TableHead className='text-center'>Actions</TableHead>
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
  if (isLoading) return <TableBodyLoader cols={4} />;
  if (!students.length) return <TableNoData colSpan={4} message='No students with dues in this section.' />;

  const filteredStudents = students.filter(
    (student) => student.name.toLowerCase().includes(searchTerm) || student.id.includes(searchTerm),
  );

  if (!filteredStudents.length) return <TableNoData colSpan={4} message='No students match your search.' />;

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
    <TableCell>
      <div className='flex items-center justify-center gap-4'>
        <MakePayment studentId={id} type='icon' />
        <GiveDiscount studentId={id} type='icon' />
      </div>
    </TableCell>
  </TableRow>
));

DuesTableRow.displayName = 'DuesTableRow';
