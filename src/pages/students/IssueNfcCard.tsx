import { z } from 'zod';
import { QK } from '@/api';
import { issueNfcCard } from '@/api/query';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { errorToast } from '@/helpers';
import { useForm } from 'react-hook-form';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaRegAddressCard } from 'react-icons/fa';
import { toast } from 'sonner';
import { TooltipContainer } from '@/components/shared';

type TIssueNfcCardProps = { studentId: string; cardId?: string };
export const IssueNfcCard = ({ studentId, cardId }: TIssueNfcCardProps) => {
  const { open, onOpenChange } = usePopupState();

  const formId = 'ISSUE_NFC_CARD_' + studentId;
  const qc = useQueryClient();

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
    onError: errorToast,
  });

  const handleIssueNfcCard = form.handleSubmit((formData) => {
    mutate({ cardId: formData.cardId, id: studentId });
  });

  return (
    <>
      <TooltipContainer label='Issue Nfc Card'>
        <Button variant='outline' size='sm' onClick={() => onOpenChange(true)}>
          <FaRegAddressCard className='size-4' />
        </Button>
      </TooltipContainer>

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
    </>
  );
};

// schemas
const issueNfcCardSchema = z.object({ cardId: z.string().min(1, 'CardId is required') });

// types
type TIssueNfcCardForm = z.infer<typeof issueNfcCardSchema>;
