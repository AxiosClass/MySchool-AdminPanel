import { QK } from '@/api';
import { FormDialog } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { TTerm } from '@/lib/types';
import { FilePenLineIcon } from 'lucide-react';
import { TermForm, TTermForm } from './TermForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTerm } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';
import { memo } from 'react';
import { TooltipContainer } from '@/components/shared';

type TUpdateTermProps = Pick<TTerm, 'id' | 'name'>;
const formId = QK.TERM + '_UPDATE';

const UpdateTerm = memo(({ id, name }: TUpdateTermProps) => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: updateTerm });

  const handleUpdateTerm = (formData: TTermForm, reset: () => void) => {
    mutate(
      { id, name: formData.name },
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
      <TooltipContainer label='Update Term'>
        <Button variant='outline' size='icon' onClick={() => onOpenChange(true)}>
          <FilePenLineIcon size={16} />
        </Button>
      </TooltipContainer>
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Update Term'
        description='Please provide the following information'
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <TermForm formId={formId} termName={name} onSubmit={handleUpdateTerm} />
      </FormDialog>
    </>
  );
});

UpdateTerm.displayName = 'UpdateTerm';

export { UpdateTerm };
