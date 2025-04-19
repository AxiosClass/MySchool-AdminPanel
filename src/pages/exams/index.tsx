import { QK } from '@/api';
import { AddExam } from './AddExam';
import { getExams } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { CommonTable, Message, PageHeader, PageTitle } from '@/components/shared';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { ActionMenu } from '@/components/shared/ActionMenu';
import { UpdateExamStatus } from './UpdateExamStatus';
import { TableLoader } from '@/components/loader';
import { DeleteExam } from './DeleteExam';
import { UpdateExam } from './UpdateExam';
import { usePopupState } from '@/hooks';
import { TExam } from '@/types';

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
    <CommonTable head={<ExamTableHead />} className={{ tableContainer: 'px-6' }}>
      {exams.map(({ id, name, year, status, percentile }, index) => (
        <TableRow key={id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{name}</TableCell>
          <TableCell>{year}</TableCell>
          <TableCell>{percentile}</TableCell>
          <TableCell>
            <UpdateExamStatus examId={id} status={status} />
          </TableCell>
          <TableCell>
            <ExamTableActions id={id} name={name} percentile={percentile} year={year} />
          </TableCell>
        </TableRow>
      ))}
    </CommonTable>
  );
};

const ExamTableHead = () => (
  <>
    <TableHead>SL</TableHead>
    <TableHead>Exam Name</TableHead>
    <TableHead>Year</TableHead>
    <TableHead>Percentile</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Actions</TableHead>
  </>
);

const ExamTableActions = ({ id, name, percentile, year }: TExamTableActionsProps) => {
  const { open, onOpenChange } = usePopupState();
  const onClose = () => onOpenChange(false);

  return (
    <ActionMenu open={open} onOpenChange={onOpenChange}>
      <DeleteExam examId={id} onCloseActionMenu={onClose} />
      <UpdateExam id={id} name={name} year={year} percentile={percentile} onCloseActionMenu={onClose} />
    </ActionMenu>
  );
};

type TExamTableActionsProps = Pick<TExam, 'id' | 'name' | 'percentile' | 'year'>;
