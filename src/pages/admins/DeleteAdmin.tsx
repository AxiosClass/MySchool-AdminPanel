import { QK } from '@/api';
import { deleteAdmin } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { errorToast } from '@/helpers';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

type DeleteAdminProps = { email: string };

const formId = 'DELETE_ADMIN';

export const DeleteAdmin = ({ email }: DeleteAdminProps) => {
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: () => deleteAdmin(email),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.ADMINS] });
      toast.message(res.message);
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Delete Admin'>
        <Button variant='destructive' size='icon' onClick={() => onOpenChange(true)}>
          <TrashIcon size={16} />
        </Button>
      </TooltipContainer>
      <DeleteDialog
        formId={formId}
        onDelete={mutate}
        open={open}
        onOpenChange={onOpenChange}
        title='Are you sure?'
        description='Once you delete this action can not be undone '
      />
    </>
  );
};
