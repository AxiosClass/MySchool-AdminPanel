import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { FormDialog } from '@/components/shared/form';
import { ExamForm, type TExamForm } from './ExamForm';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { errorMessageGen } from '@/helpers';
import { addExam } from '@/api/query';

const formId = QK.EXAM + '_ADD';
export const AddExam = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: addExam });

  const handleAddExam = (formData: TExamForm, reset: () => void) => {
    mutate(
      { ...formData, year: Number(formData.year) },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.EXAM] });
          onOpenChange(false);
          reset();
        },
        onError: (error) => toast.error(errorMessageGen(error)),
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Add Exam' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Exam'
        description='Please fill all the fields'
        submitButtonTitle='Add Exam'
        submitLoadingTitle='Adding...'
      >
        <ExamForm formId={formId} onSubmit={handleAddExam} />
      </FormDialog>
    </>
  );
};
