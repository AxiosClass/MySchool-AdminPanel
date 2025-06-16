import { QK } from '@/api';
import { issueNfcCard } from '@/api/query';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type TIssueNfcCardProps = { studentId: string; cardId?: string };

export const IssueNfcCard = ({ studentId, cardId }: TIssueNfcCardProps) => {
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
      <Button variant='outline' onClick={() => onOpenChange(true)}>
        Issue Nfc Card
      </Button>
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

type TIssueNfcCardForm = z.infer<typeof issueNfcCardSchema>;
