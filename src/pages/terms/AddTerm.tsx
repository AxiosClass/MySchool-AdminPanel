import { memo } from 'react';
import { QK } from '@/api';
import { toast } from 'sonner';
import { addTerm } from '@/api/query';
import { ActionButton } from '@/components/ui/button';
import { FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { errorToast } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TermForm, TTermForm } from './TermForm';

const formId = QK.TERM + '_ADD';

const AddTerm = memo(() => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addTerm,
  });

  const onAddTerms = (formData: TTermForm, reset: () => void) => {
    mutate(
      { name: formData.name },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.TERM] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Add Term' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Term'
        description='Provide following information'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <TermForm formId={formId} onSubmit={onAddTerms} />
      </FormDialog>
    </>
  );
});

AddTerm.displayName = 'AddTerm';

export { AddTerm };
