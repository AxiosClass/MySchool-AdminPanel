import { QK } from '@/api';
import { CommonTable, Message, TableNoData, SearchInput } from '@/components/shared';
import { getSubjects, TGetSubjectsQueryResult } from '@/api/query';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TableBodyLoader } from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { TUserSearch, useSearch } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { AddSubject } from './AddSubject';
import { DeleteSubject } from './DeleteSubject';
import { MdError } from 'react-icons/md';

export const SubjectTable = () => {
  const { searchTerm, value, onSearchChange } = useSearch();

  return (
    <CommonTable
      header={<StudentTableHeader value={value} onSearchChange={onSearchChange} />}
      head={<SubjectTableHead />}
      tableContainerClassName='px-6 mt-6'
    >
      <SubjectTableBody searchTerm={searchTerm} />
    </CommonTable>
  );
};

const StudentTableHeader = (props: Pick<TUserSearch, 'value' | 'onSearchChange'>) => {
  return (
    <div className='flex items-center justify-between gap-6'>
      <SearchInput {...props} placeholder='Search Subject ...' className='max-w-[350px]' />
      <AddSubject />
    </div>
  );
};

const SubjectTableHead = () => (
  <>
    <TableHead>Name</TableHead>
    <TableHead>description</TableHead>
    <TableHead>Sub Subject</TableHead>
    <TableHead>Type</TableHead>
    <TableHead>Action</TableHead>
  </>
);

const SubjectTableBody = ({ searchTerm }: { searchTerm: string }) => {
  const { data: subjects, isLoading } = useQuery({
    queryKey: [QK.SUBJECT, { searchTerm }],
    queryFn: () => getSubjects({ ...(searchTerm && { searchTerm }) }),
    select: (res) => res.data,
  });

  if (isLoading) return <TableBodyLoader cols={5} />;
  if (!subjects?.length) return <TableNoData message='No Subject found!' colSpan={5} />;

  return subjects.map(({ id, name, description, type, childSubject }) => (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>
      <TableCell className='text-sm text-muted-foreground'>{description}</TableCell>
      <TableCell>
        <SubSubject subSubjects={childSubject} />
      </TableCell>
      <TableCell>
        <Badge>{type}</Badge>
      </TableCell>
      <TableCell>
        <DeleteSubject id={id} />
      </TableCell>
    </TableRow>
  ));
};

type TSubSubjectProps = { subSubjects: TGetSubjectsQueryResult['childSubject'] };

const SubSubject = ({ subSubjects }: TSubSubjectProps) => {
  if (!subSubjects.length) return <Message position='start' message='No Sub Subject Found!' />;

  return (
    <ul className='flex flex-col gap-2'>
      {subSubjects.map(({ id, name, type }) => (
        <li key={id} className='flex items-center gap-2'>
          <MdError />
          <h2 className='mr-2 text-sm font-medium'>Name : {name}</h2>
          <p className='text-sm font-medium'>Type : {type}</p>
        </li>
      ))}
    </ul>
  );
};
