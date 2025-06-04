import moment from 'moment';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QK } from '@/api';
import { getStudents, issueNfcCard } from '@/api/query';
import { TableLoader } from '@/components/loader';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Message, UserIcon } from '@/components/shared';
import { dateFormatString } from '@/data';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

export const StudentTable = () => {
  const { data: students, isLoading } = useQuery({
    queryKey: [QK.STUDENT],
    queryFn: getStudents,
    select: (res) => res.data,
  });

  if (isLoading) return <TableLoader />;
  if (!students?.length) return <Message message='No student found' />;

  return (
    <CommonTable
      head={
        <>
          <TableHead>Student Info</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Guardian</TableHead>
          <TableHead>Admitted At</TableHead>
          <TableHead className='text-center'>Action</TableHead>
        </>
      }
      className={{ tableContainer: 'px-6' }}
    >
      {students.map(({ id, name, cardId, class: classInfo, classroom, guardian, address, admittedAt }) => {
        return (
          <TableRow key={id} className='border-b'>
            <TableCell>
              <div className='flex gap-4'>
                <UserIcon username={name} />
                <div>
                  <p className='text-base font-semibold'>{name}</p>
                  <p className='text-sm text-muted-foreground'>ID : {id}</p>
                  {cardId && <p className='text-sm text-muted-foreground'>CardID : {cardId}</p>}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className='text-base font-semibold'>Class : {classInfo}</p>
              <p className='text-sm text-muted-foreground'>Section : {classroom.name}</p>
            </TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>
              <p className='text-base font-semibold'> {guardian.name}</p>
              <p className='text-sm text-muted-foreground'>Cell : {guardian.phone}</p>
            </TableCell>
            <TableCell>{moment(admittedAt).format(dateFormatString.basic)}</TableCell>
            <TableCell>
              <IssueNfcCard key={cardId} studentId={id} cardId={cardId} />
            </TableCell>
          </TableRow>
        );
      })}
    </CommonTable>
  );
};

const IssueNfcCard = ({ studentId, cardId }: TIssueNfcCardProps) => {
  const formId = 'ISSUE_NFC_CARD_' + studentId;
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();

  const form = useForm<TIssueNfcCardForm>({
    resolver: zodResolver(issueNfcCardSchema),
    defaultValues: { cardId: cardId || '' },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: issueNfcCard,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.STUDENT] });
      onOpenChange(false);
    },
    onError: (error) => errorToast(error),
  });

  const handleIssueNfcCard = form.handleSubmit((formData) => {
    mutate({ cardId: formData.cardId, id: studentId });
  });

  return (
    <div className='mx-auto w-fit'>
      <Button onClick={() => onOpenChange(true)}>Issue Nfc Card</Button>
      <FormDialog
        formId={formId}
        title='Issue Nfc Card'
        open={open}
        onOpenChange={onOpenChange}
        submitButtonTitle='Issue'
        submitLoadingTitle='Issuing...'
      >
        <Form {...form}>
          <form id={formId} onSubmit={handleIssueNfcCard}>
            <CommonFormField control={form.control} name='cardId'>
              {({ field }) => <Input {...field} />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </div>
  );
};

// schemas
const issueNfcCardSchema = z.object({ cardId: z.string().min(1, 'CardId is required') });

// types
type TIssueNfcCardProps = { studentId: string; cardId?: string };
type TIssueNfcCardForm = z.infer<typeof issueNfcCardSchema>;
