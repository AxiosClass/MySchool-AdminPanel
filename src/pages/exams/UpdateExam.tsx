import { QK } from '@/api';
import { toast } from 'sonner';
import { TExam } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetPercentile, usePopupState } from '@/hooks';
import { FormDialog } from '@/components/shared/form';
import { updateExam } from '@/api/query';
import { errorMessageGen } from '@/helpers';
import { ExamForm, TExamForm } from './ExamForm';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

export const UpdateExam = ({ id, year, name, percentile, onCloseActionMenu }: TUpdateExamProps) => {
  const formId = QK.EXAM + '_UPDATE_' + id;
  const qc = useQueryClient();

  const { data: totalPercentile = 0 } = useGetPercentile(year);
  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: updateExam });

  const remainingPercentile = 100 - totalPercentile;
  const defaultValues = { name, percentile: String(percentile) };

  const handleUpdateExam = (formData: TExamForm) => {
    mutate(
      { id, payload: { ...formData, percentile: Number(formData.percentile) } },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.EXAM] });
          onOpenChange(false);
          onCloseActionMenu();
        },
        onError: (error) => toast.error(errorMessageGen(error)),
      },
    );
  };

  return (
    <>
      <Button onClick={() => onOpenChange(true)} variant='outline'>
        <PencilIcon className='size-4' /> Update Exam
      </Button>
      <FormDialog
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Update Exam'
        description='Provide exam information to update exam'
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <ExamForm
          formId={formId}
          onSubmit={handleUpdateExam}
          remainingPercentile={remainingPercentile}
          defaultValues={defaultValues}
        />
      </FormDialog>
    </>
  );
};

type TUpdateExamProps = Pick<TExam, 'id' | 'name' | 'percentile' | 'year'> & { onCloseActionMenu: () => void };
