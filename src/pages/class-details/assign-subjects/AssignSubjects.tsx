import { QK } from '@/api';
import { usePopupState } from '@/hooks';
import { FormSheet } from '@/components/shared/form';
import { AssignSubjectsForm, TAssignSubjectsForm } from './AssignSubjectsForm';
import { ActionButton } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAssignedSubjects } from '@/api/query';
import { Skeleton } from '@/components/ui/skeleton';

// main component
export const AssignSubjects = ({ classId }: { classId: string }) => {
  const formId = QK.SUBJECTS + '_ASSIGN_SUBJECT_' + classId;
  const { open, onOpenChange } = usePopupState();

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
        <AssignedSubjects classId={classId} formId={formId} onOpenChange={onOpenChange} />
      </FormSheet>
    </>
  );
};

type AssignedSubjectsProps = { classId: string; formId: string; onOpenChange: (open: boolean) => void };

const AssignedSubjects = ({ classId, formId, onOpenChange }: AssignedSubjectsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.SUBJECTS, { classId }],
    queryFn: () => getAssignedSubjects(classId),
    select: (res) => res.data,
  });

  const defaultValues: TAssignSubjectsForm = {
    subjects: data?.map(({ id, name, type, description }) => ({ id, name, type, description })) || [],
  };

  if (isLoading) return <AssignSubjectLoading />;

  return (
    <AssignSubjectsForm formId={formId} defaultValues={defaultValues} onOpenChange={onOpenChange} classId={classId} />
  );
};

const AssignSubjectLoading = () => <Skeleton className='h-20 w-full' />;
