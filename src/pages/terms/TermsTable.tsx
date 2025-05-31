import { CommonTable, SearchInput, TableNoData } from '@/components/shared';
import { TableHead } from '@/components/ui/table';
import { AddTerm } from './AddTerm';
import { TUserSearch, useSearch } from '@/hooks';

export const TermsTable = () => {
  const { value, onSearchChange } = useSearch();

  return (
    <CommonTable
      className={{ tableContainer: 'p-6' }}
      header={<TermTableHeader value={value} onSearchChange={onSearchChange} />}
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
    >
      <TableNoData colSpan={4} message='No terms found' />
    </CommonTable>
  );
};

type TTermTableHeaderProps = Pick<TUserSearch, 'value' | 'onSearchChange'>;

const TermTableHeader = ({ value, onSearchChange }: TTermTableHeaderProps) => (
  <div className='flex items-center justify-between'>
    <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search terms...' />
    <AddTerm />
  </div>
);
