import { QK } from '@/api';
import { deleteSubject } from '@/api/query';
import { DeleteDialog, TooltipContainer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

type TDeleteSubjectProps = { id: string };

export const DeleteSubject = ({ id }: TDeleteSubjectProps) => {
  const formId = QK.SUBJECTS + '_DELETE_' + id;
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: () => deleteSubject(id),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.SUBJECTS] });
      onOpenChange(false);
    },
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
