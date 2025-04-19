import { QK } from '@/api';
import { deleteExam } from '@/api/query';
import { DeleteDialog } from '@/components/shared/DeleteDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen } from '@/helpers';
import { usePopupState } from '@/hooks';
import { Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const DeleteExam = ({ examId, onCloseActionMenu }: TDeleteExamProps) => {
  const qc = useQueryClient();
  const formId = QK.EXAM + '_DELETE_' + examId;
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: deleteExam,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: [QK.EXAM] });
      toast.success(res.message);
      onOpenChange(false);
      onCloseActionMenu();
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const handleDelete = () => {
    console.log('Clicked');
    mutate(examId);
  };

  return (
    <>
      <Button variant='destructive' onClick={() => onOpenChange(true)}>
        <Trash2Icon /> Delete Exam
      </Button>
      <DeleteDialog
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Are You sure '
        description='Once you delete this exam you can not turn it back on.'
        onDelete={handleDelete}
      />
    </>
  );
};

type TDeleteExamProps = { examId: string; onCloseActionMenu: () => void };
