import { QK } from '@/api';
import { AddExam } from './AddExam';
import { CommonTable, Message, PageHeader, PageTitle } from '@/components/shared';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useQuery } from '@tanstack/react-query';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { getExams } from '@/api/query';
import { TableLoader } from '@/components/loader';

export default function ExamsPage() {
  return (
    <>
      <PageTitle title='Exams' />
      <ScrollArea>
        <PageHeader label='Exams'>
          <AddExam />
        </PageHeader>
        <ExamTable />
      </ScrollArea>
    </>
  );
}

const ExamTable = () => {
  const { data: exams, isLoading } = useQuery({
    queryKey: [QK.EXAM],
    queryFn: () => getExams({}),
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;
  if (!exams?.length) return <Message className='my-6' message='No exams found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>SL</TableHead>
          <TableHead>Exam Name</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {exams.map(({ id, name, year, status }, index) => (
        <TableRow key={id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{year}</TableCell>
          <TableCell>{status}</TableCell>
          <TableCell>
            {/* <ActionButton actionType='EDIT' label='Edit' />
            <ActionButton actionType='DELETE' label='Delete' /> */}
          </TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
