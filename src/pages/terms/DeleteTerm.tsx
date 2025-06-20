import { QK } from '@/api';
import { deleteTerm } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

const mutationKey = QK.TERM + '_DELETE';

export const DeleteTerm = ({ id }: { id: string }) => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => deleteTerm(id),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.TERM] });
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Delete Term'>
        <Button variant='destructive' size='icon' onClick={() => onOpenChange(true)}>
          <Trash2Icon size={16} />
        </Button>
      </TooltipContainer>
      <DeleteDialog formId={mutationKey} open={open} onOpenChange={onOpenChange} onDelete={mutate} />
    </>
  );
};
