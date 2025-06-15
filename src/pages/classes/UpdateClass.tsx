import { QK } from '@/api';
import { TooltipContainer } from '@/components/shared';
import { FormDialog } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { TClass } from '@/lib/types';
import { PenLineIcon } from 'lucide-react';
import { ClassForm, TClassForm } from './ClassForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClass } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

type TUpdateClassProps = Pick<TClass, 'id' | 'name' | 'level' | 'admissionFee' | 'monthlyFee' | 'termFee'>;
export const UpdateClass = ({ id, ...defaultValues }: TUpdateClassProps) => {
  const { open, onOpenChange } = usePopupState();
  const formId = `${QK.CLASS}_UPDATE`;
  const qc = useQueryClient();

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: updateClass });

  const handleUpdateClass = (formData: TClassForm, reset: () => void) => {
    mutate(
      { ...formData, classId: id },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.CLASS] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  return (
    <>
      <TooltipContainer label='Update Class'>
        <Button
          variant='outline'
          size='icon'
          onClick={(e) => {
            onOpenChange(true);
            e.stopPropagation();
          }}
          className='shrink-0 bg-transparent'
        >
          <PenLineIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Update Class'
        description='Provide following information to update the class'
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <ClassForm formId={formId} onSubmit={handleUpdateClass} defaultValues={defaultValues} />
      </FormDialog>
    </>
  );
};
