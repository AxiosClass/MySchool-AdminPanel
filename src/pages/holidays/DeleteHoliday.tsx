import { QK } from '@/api';
import { deleteHoliday } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

export const DeleteHoliday = ({ holidayId }: { holidayId: string }) => {
  const qc = useQueryClient();
  const mutationKey = QK.HOLIDAY + '_DELETE';

  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => deleteHoliday(holidayId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.HOLIDAY] });
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Delete Holiday'>
        <Button
          variant='destructive-outline'
          className='bg-destructive/5 hover:bg-destructive/20'
          size='icon'
          onClick={() => onOpenChange(true)}
        >
          <Trash2Icon className='size-4' />
        </Button>
      </TooltipContainer>

      <DeleteDialog formId={mutationKey} onDelete={mutate} open={open} onOpenChange={onOpenChange} />
    </>
  );
};
