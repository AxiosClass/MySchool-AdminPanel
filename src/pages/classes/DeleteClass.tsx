import { QK } from '@/api';
import { deleteClass } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

export const DeleteClass = ({ classId }: { classId: string }) => {
  const formId = `${QK.CLASS}_DELETE_${classId}`;
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: () => deleteClass(classId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      onOpenChange(false);
    },
  });

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
          className='shrink-0 border-destructive bg-transparent'
        >
          <Trash2Icon className='size-4 text-destructive' />
        </Button>
      </TooltipContainer>
      <DeleteDialog open={open} onOpenChange={onOpenChange} formId={formId} onDelete={mutate} />
    </>
  );
};
