import { QK } from '@/api';
import { Message, TooltipContainer } from '@/components/shared';
import { FormSheet } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { PencilIcon } from 'lucide-react';
import { StudentForm, TStudentForm } from './StudentForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStudentDetails, updateStudent } from '@/api/query';
import { TeacherOrStudentFormSkeleton } from '@/components/loader';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

export const UpdateStudent = ({ studentId }: { studentId: string }) => {
  const formId = `${QK.STUDENT}_UPDATE_${studentId}`;
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <TooltipContainer label='Update Student'>
        <Button variant='outline' size='sm' onClick={() => onOpenChange(true)}>
          <PencilIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Update Student'
        description='Fill up the form to update the student'
        submitButtonTitle='Update'
        submitLoadingTitle='Updating...'
      >
        <StudentFetcher formId={formId} studentId={studentId} onOpenChange={onOpenChange} />
      </FormSheet>
    </>
  );
};

type StudentFetcherProps = { studentId: string; formId: string; onOpenChange: (open: boolean) => void };
const StudentFetcher = ({ studentId, formId, onOpenChange }: StudentFetcherProps) => {
  const qc = useQueryClient();

  const { data: studentDetails, isLoading } = useQuery({
    queryKey: [QK.STUDENT, 'DETAILS', { studentId }],
    queryFn: () => getStudentDetails(studentId),
    select: (res) => res.data,
  });

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: updateStudent });

  if (isLoading) return <TeacherOrStudentFormSkeleton />;
  if (!studentDetails) return <Message message='Student not found' className='my-6' />;

  const { name, birthId, bloodGroup, dob, address, parents, guardian } = studentDetails;

  const handleUpdateStudent = (formData: TStudentForm, reset: () => void) => {
    mutate(
      { ...formData, studentId },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.STUDENT] });
          reset();
          onOpenChange(false);
        },
        onError: errorToast,
      },
    );
  };

  return (
    <StudentForm
      formId={formId}
      onSubmit={handleUpdateStudent}
      defaultValues={{ name, birthId, bloodGroup, address, dob: new Date(dob), guardian, parents }}
      isUpdate
    />
  );
};
