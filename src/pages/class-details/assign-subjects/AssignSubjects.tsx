import { QK } from '@/api';
import { toast } from 'sonner';
import { usePopupState } from '@/hooks';
import { FormSheet } from '@/components/shared/form';
import { type TAssignSubjectFormSubmitFn, AssignSubjectsForm } from './AssignSubjectsForm';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignSubjects } from '@/api/query';
import { errorMessageGen } from '@/helpers';

// main component
export const AssignSubjects = ({ classId }: { classId: string }) => {
  const formId = QK.SUBJECTS + '_ASSIGN_SUBJECT_' + classId;
  const qc = useQueryClient();

  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: assignSubjects });

  const handleAssignSubject: TAssignSubjectFormSubmitFn = (data, reset) => {
    const subjectIds = data.subjects.map((subject) => subject.id);

    mutate(
      { classId, subjectIds },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.CLASS, { classId }] });
          qc.invalidateQueries({ queryKey: [QK.SUBJECTS, { classId }] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => toast.error(errorMessageGen(error)),
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Assign Subjects' onClick={() => onOpenChange(true)} />
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Assign Subjects'
        description='Provide following information'
        submitButtonTitle='Save'
        submitLoadingTitle='Saving...'
      >
        <AssignSubjectsForm formId={formId} onSubmit={handleAssignSubject} />
      </FormSheet>
    </>
  );
};
