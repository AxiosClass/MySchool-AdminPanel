import { QK } from '@/api';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TooltipContainer } from '../TooltipContainer';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { DeleteDialog } from '../DeleteDialog';
import { deleteClassroom } from '@/api/query';
import { errorToast } from '@/helpers';
import { toast } from 'sonner';

export const DeleteSection = ({ sectionId }: { sectionId: string }) => {
  const formId = `${QK.CLASSROOM}_DELETE_${sectionId}`;
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: () => deleteClassroom(sectionId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      onOpenChange(false);
    },
    onError: (error) => errorToast(error),
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
