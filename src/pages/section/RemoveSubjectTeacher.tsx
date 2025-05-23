import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { errorMessageGen } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteDialog } from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { deleteSubjectTeacher } from '@/api/query';

export const RemoveSubjectTeacher = ({ classroomSubjectTeacherId, classroomId }: TRemoveSubjectTeacherProps) => {
  const mutationKey = `${QK.CLASSROOM}_REMOVE_SUBJECT_TEACHER_${classroomSubjectTeacherId}`;
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: deleteSubjectTeacher,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASSROOM, { classroomId }] });
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  return (
    <>
      <Button variant='destructive' onClick={() => onOpenChange(true)} size='icon'>
        <TrashIcon className='size-4' />
      </Button>
      <DeleteDialog
        onDelete={() => mutate(classroomSubjectTeacherId)}
        formId={mutationKey}
        open={open}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

// types
type TRemoveSubjectTeacherProps = {
  classroomSubjectTeacherId: string;
  classroomId: string;
};
