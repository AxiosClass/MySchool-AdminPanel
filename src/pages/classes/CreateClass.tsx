import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { createClass } from '@/api/query';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormDialog } from '@/components/shared/form';
import { errorToast } from '@/helpers';
import { ClassForm, TClassForm } from './ClassForm';

export const CreateClass = () => {
  const { open, onOpenChange } = usePopupState();
  const formId = QK.CLASS + '_CREATE';
  const qc = useQueryClient();

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: createClass });

  const handleCreateClass = (formData: TClassForm, reset: () => void) => {
    mutate(
      { ...formData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.CLASS] });
          reset();
          onOpenChange(false);
        },
        onError: errorToast,
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Create Class' onClick={() => onOpenChange(true)} />

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Class'
        description='Provide following information to create a class'
        submitButtonTitle='Cerate Class'
        submitLoadingTitle='Cratering Class...'
      >
        <ClassForm formId={formId} onSubmit={handleCreateClass} />
      </FormDialog>
    </>
  );
};
