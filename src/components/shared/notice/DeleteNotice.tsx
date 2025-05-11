import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { deleteNotice } from '@/api/query';
import { errorMessageGen } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteDialog } from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export const DeleteNotice = ({ noticeId }: { noticeId: string }) => {
  const mutationKey = `${QK.NOTICE}_DELETE_${noticeId}`;
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: deleteNotice,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTICE] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  return (
    <>
      <Button variant='destructive' onClick={() => onOpenChange(true)} size='icon'>
        <TrashIcon className='size-4' />
      </Button>
      <DeleteDialog onDelete={() => mutate(noticeId)} formId={mutationKey} open={open} onOpenChange={onOpenChange} />
    </>
  );
};
