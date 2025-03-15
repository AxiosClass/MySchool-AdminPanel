import { QK } from '@/api';
import { AddExam } from './AddExam';
import { getExams } from '@/api/query';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useQuery } from '@tanstack/react-query';
import { CommonTable, Message, PageHeader, PageTitle } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { TableLoader } from '@/components/loader';
import { UpdateExamStatus } from './UpdateExamStatus';

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
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {exams.map(({ id, name, year, status }, index) => (
        <TableRow key={id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{year}</TableCell>
          <TableCell>
            <UpdateExamStatus examId={id} status={status} />
          </TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};
