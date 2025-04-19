import { QK } from '@/api';
import { toast } from 'sonner';
import { useGetPercentile, usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExamForm, TExamForm } from './ExamForm';
import { FormDialog } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { errorMessageGen } from '@/helpers';
import { addExam } from '@/api/query';

const date = new Date();
const year = date.getFullYear();
const formId = QK.EXAM + '_ADD';

export const AddExam = () => {
  const { open, onOpenChange } = usePopupState();
  const qc = useQueryClient();

  const { data: percentile = 0 } = useGetPercentile(year);

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: addExam });
  const remainingPercentile = 100 - percentile;

  const handleAddExam = (formData: TExamForm, resetForm: () => void) => {
    mutate(
      { ...formData, year: Number(year), percentile: Number(formData.percentile) },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.EXAM] });
          onOpenChange(false);
          resetForm();
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
        <ExamForm formId={formId} onSubmit={handleAddExam} remainingPercentile={remainingPercentile} />
      </FormDialog>
    </>
  );
};
