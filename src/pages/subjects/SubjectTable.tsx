import { QK } from '@/api';
import { getSubjects, TGetSubjectsQueryResult } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable, Message } from '@/components/shared';
import { TableNoData } from '@/components/shared/TableNodata';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';

export const SubjectTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.SUBJECTS],
    queryFn: () => getSubjects({}),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Name</TableHead>
          <TableHead>description</TableHead>
          <TableHead>Sub Subject</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      <SubjectTableBody subjects={data} />
    </CommonTable>
  );
};

type TSubjectTableBodyProps = { subjects: TGetSubjectsQueryResult[] | undefined };

const SubjectTableBody = ({ subjects }: TSubjectTableBodyProps) => {
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
    </TableRow>
  ));
};

type TSubSubjectProps = { subSubjects: TGetSubjectsQueryResult['childSubject'] };

const SubSubject = ({ subSubjects }: TSubSubjectProps) => {
  if (!subSubjects.length) return <Message position='start' message='No Sub Subject Found!' />;

  return (
    <ul className='flex flex-col gap-2'>
      {subSubjects.map(({ id, name, type }) => (
        <li key={id} className='flex items-center gap-4'>
          <div className='size-3 rounded-full bg-black' />
          <h2 className='font-medium'>Name : {name}</h2>
          <p className='font-medium'>Type : {type}</p>
        </li>
      ))}
    </ul>
  );
};
