import { CommonTable, Pagination, SearchInput, usePagination } from '@/components/shared';
import { TableHead } from '@/components/ui/table';
import { TUseSearch, useSearch } from '@/hooks';
import { useCallback, useState } from 'react';

export const DuesTable = () => {
  const { value, onSearchChange, page, onPageChange } = useDues();
  return (
    <CommonTable
      head={<DuesTableHead />}
      header={<DuesHeader value={value} onSearchChange={onSearchChange} />}
      footer={<Pagination page={page} onPageChange={onPageChange} totalPages={10} />}
    ></CommonTable>
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

type TDuesHeaderProps = Pick<TUseSearch, 'value' | 'onSearchChange'> & {
  // level: string;
  // onLevelChange: (level: string) => void;
  // classroomId: string;
  // onClassroomChange: string;
  // onReset: () => void;
};

const DuesHeader = ({ value, onSearchChange }: TDuesHeaderProps) => {
  return (
    <div className='flex items-center gap-4'>
      <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search by name, id ...' />
    </div>
  );
};

// Hooks
const useDues = () => {
  const { value, searchTerm, onSearchChange } = useSearch();
  const { page, onPageChange } = usePagination();
  const [level, setLevel] = useState('');
  const [classroomId, setClassroomId] = useState('');

  const onLevelChange = useCallback((level: string) => setLevel(level), []);
  const onClassroomIdChange = useCallback((classroomId: string) => setClassroomId(classroomId), []);

  const onReset = useCallback(() => {
    onSearchChange('');
    setLevel('');
    setClassroomId('');
  }, [onSearchChange]);

  return {
    value,
    searchTerm,
    onSearchChange,
    page,
    onPageChange,
    level,
    onLevelChange,
    classroomId,
    onClassroomIdChange,
    onReset,
  };
};
