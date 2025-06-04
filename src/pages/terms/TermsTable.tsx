import { CommonTable, SearchInput, TableNoData } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TUserSearch, useSearch } from '@/hooks';
import { AddTerm } from './AddTerm';
import { useQuery } from '@tanstack/react-query';
import { QK } from '@/api';
import { getTerms } from '@/api/query';
import { TableBodyLoader } from '@/components/loader';
import { UpdateTerm } from './UpdateTerm';
import { UpdateTermStatus } from './UpateTermStatus';
import { DeleteTerm } from './DeleteTerm';

export const TermsTable = () => {
  const { value, onSearchChange, searchTerm } = useSearch();
  const { data, isLoading } = useGetTermsData(searchTerm);

  return (
    <CommonTable
      className={{ tableContainer: 'p-6' }}
      header={<TermTableHeader value={value} onSearchChange={onSearchChange} />}
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className='text-center'>Action</TableHead>
        </>
      }
    >
      <TermTableBody terms={data} isLoading={isLoading} />
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

type TTermTableBodyProps = { terms: TQueryResult; isLoading: boolean };

const TermTableBody = ({ terms, isLoading }: TTermTableBodyProps) => {
  if (isLoading) return <TableBodyLoader />;
  if (!terms?.length) return <TableNoData colSpan={4} message='No Term Found' />;

  return terms.map((term) => (
    <TableRow key={term.id}>
      <TableCell>{term.name}</TableCell>
      <TableCell>{term.year}</TableCell>
      <TableCell>
        <UpdateTermStatus id={term.id} status={term.status} />
      </TableCell>
      <TableCell>
        <TermTableActions {...term} />
      </TableCell>
    </TableRow>
  ));
};

type TTermTableActionsProps = NonNullable<TQueryResult>[number];

const TermTableActions = ({ id, name }: TTermTableActionsProps) => (
  <div className='flex items-center justify-center gap-3'>
    <UpdateTerm id={id} name={name} />
    <DeleteTerm id={id} />
  </div>
);

// Hooks
const useGetTermsData = (searchTerm: string) => {
  return useQuery({
    queryKey: [QK.TERM, { searchTerm }],
    queryFn: () => getTerms({ searchTerm }),
    select: (res) => res.data,
  });
};

type TQueryResult = ReturnType<typeof useGetTermsData>['data'];
