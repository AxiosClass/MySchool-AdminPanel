import { QK } from '@/api';
import { FormSheet } from '@/components/shared/form';
import { AssignSubjectsForm, TAssignSubjectsForm } from './AssignSubjectsForm';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAssignedSubjects } from '@/api/query';
import { Skeleton } from '@/components/ui/skeleton';
import { AssignSubjectStoreProvider, useAssignSubjectStore } from './assignSubjectStore';
import { useStore } from 'zustand';
import { PlusIcon } from 'lucide-react';

// main component
export const AssignSubjects = ({ classId }: { classId: string }) => {
  return (
    <AssignSubjectStoreProvider>
      <AssignSubjectSheet classId={classId} />
    </AssignSubjectStoreProvider>
  );
};

type AssignedSubjectsProps = { classId: string; formId: string };

const AssignSubjectSheet = ({ classId }: { classId: string }) => {
  const formId = QK.SUBJECT + '_ASSIGN_SUBJECT_' + classId;
  const store = useAssignSubjectStore();
  const sheetOpen = useStore(store, (state) => state.sheetOpen);
  const setSheetOpen = useStore(store, (state) => state.setSheetOpen);
  const setPopOpen = useStore(store, (state) => state.setPopOpen);

  return (
    <>
      <Button variant='outline' onClick={() => setSheetOpen(true)}>
        <PlusIcon className='size-4' />
        Assign Subjects
      </Button>

      <FormSheet
        formId={formId}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setPopOpen(false);
        }}
        title='Assign Subjects'
        description='Provide following information'
        submitButtonTitle='Save'
        submitLoadingTitle='Saving...'
      >
        <AssignedSubjects classId={classId} formId={formId} />
      </FormSheet>
    </>
  );
};

const AssignedSubjects = ({ classId, formId }: AssignedSubjectsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.SUBJECT, { classId }],
    queryFn: () => getAssignedSubjects(classId),
    select: (res) => res.data,
  });

  const defaultValues: TAssignSubjectsForm = {
    subjects: data?.map(({ id, name, type, description }) => ({ id, name, type, description })) || [],
  };

  if (isLoading) return <AssignSubjectLoading />;

  return <AssignSubjectsForm formId={formId} defaultValues={defaultValues} classId={classId} />;
};

const AssignSubjectLoading = () => <Skeleton className='h-20 w-full' />;
