import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { Trash2Icon } from 'lucide-react';
import { DeleteDialog } from '../DeleteDialog';
import { QK } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/api/query';
import { toast } from 'sonner';
import { errorMessageGen } from '@/helpers';

const formId = QK.NOTE + '_DELETE';
type TDeleteNoteProps = { noteId: string; sectionId: string; onActionChange: (open: boolean) => void };

export const DeleteNote = ({ noteId, onActionChange, sectionId }: TDeleteNoteProps) => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: () => deleteNote(noteId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.NOTE, { sectionId }] });
      onOpenChange(false);
      onActionChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  return (
    <>
      <Button className='justify-start gap-4' variant='destructive-ghost' size='sm' onClick={() => onOpenChange(true)}>
        <Trash2Icon size={20} /> Delete Note
      </Button>
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
