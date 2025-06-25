import { QK } from '@/api';
import { deleteTeacher } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

export const DeleteTeacher = ({ teacherId }: { teacherId: string }) => {
  const qc = useQueryClient();
  const mutationKey = QK.TEACHER + '_DELETE';

  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => deleteTeacher(teacherId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.TEACHER] });
      qc.invalidateQueries({ queryKey: [QK.OVERVIEW] });
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Delete Teacher'>
        <Button
          variant='destructive-outline'
          className='bg-destructive/5 hover:bg-destructive/20'
          size='icon'
          onClick={() => onOpenChange(true)}
        >
          <Trash2Icon className='size-4' />
        </Button>
      </TooltipContainer>

      <DeleteDialog
        formId={mutationKey}
        onDelete={mutate}
        open={open}
        onOpenChange={onOpenChange}
        title='Are you sure?'
        description='Once you delete this action can not be undone'
      />
    </>
  );
};
