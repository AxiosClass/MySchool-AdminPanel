import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteDialog } from '@/components/shared/DeleteDialog';
import { Button } from '@/components/ui/button';
import { deleteSubjectTeacher } from '@/api/query';
import { errorToast } from '@/helpers';
import { TrashIcon } from 'lucide-react';
import { TooltipContainer } from '@/components/shared';

// types
type TRemoveSubjectTeacherProps = { classroomSubjectTeacherId: string; sectionId: string };

export const RemoveSubjectTeacher = ({ classroomSubjectTeacherId, sectionId }: TRemoveSubjectTeacherProps) => {
  const qc = useQueryClient();
  const mutationKey = `${QK.CLASSROOM}_REMOVE_SUBJECT_TEACHER_${classroomSubjectTeacherId}`;
  const { open, onOpenChange } = usePopupState();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => deleteSubjectTeacher(classroomSubjectTeacherId),
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASSROOM, QK.SUBJECT, { sectionId }] });
      onOpenChange(false);
    },
    onError: errorToast,
  });

  return (
    <>
      <TooltipContainer label='Remove Teacher'>
        <Button variant='destructive' onClick={() => onOpenChange(true)} size='icon'>
          <TrashIcon size={16} />
        </Button>
      </TooltipContainer>
      <DeleteDialog onDelete={mutate} formId={mutationKey} open={open} onOpenChange={onOpenChange} />
    </>
  );
};
