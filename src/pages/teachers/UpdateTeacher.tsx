import { QK } from '@/api';
import { getTeacherDetails, updateTeacher } from '@/api/query';
import { TeacherOrStudentFormSkeleton } from '@/components/loader';
import { Message, TooltipContainer } from '@/components/shared';
import { FormSheet } from '@/components/shared/form';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PencilIcon } from 'lucide-react';
import { TeacherForm, TTeacherForm } from './TeacherForm';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';

export const UpdateTeacher = ({ teacherId }: { teacherId: string }) => {
  const { open, onOpenChange } = usePopupState();
  const formId = `${QK.TEACHER}_UPDATE_${teacherId}`;

  return (
    <>
      <TooltipContainer label='Update Teacher'>
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
        <UpdateTeacherFormLoader formId={formId} teacherId={teacherId} onOpenChange={onOpenChange} />
      </FormSheet>
    </>
  );
};

type TUpdateTeacherFormLoaderProps = { teacherId: string; formId: string; onOpenChange: (open: boolean) => void };
const UpdateTeacherFormLoader = ({ formId, teacherId, onOpenChange }: TUpdateTeacherFormLoaderProps) => {
  const qc = useQueryClient();

  const { data: teacherDetails, isLoading } = useQuery({
    queryKey: [QK.TEACHER, 'DETAILS', { teacherId }],
    queryFn: () => getTeacherDetails(teacherId),
    select: (res) => res.data,
  });

  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: updateTeacher });

  if (isLoading) return <TeacherOrStudentFormSkeleton />;
  if (!teacherDetails) return <Message message='Teacher not found' className='my-6' />;

  const { id, name, nid, phone, dob, bloodGroup, address, salary, education } = teacherDetails;

  const handleUpdateTeacher = (formData: TTeacherForm, reset: () => void) => {
    mutate(
      { ...formData, teacherId },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.TEACHER] });
          reset();
          onOpenChange(false);
        },
        onError: errorToast,
      },
    );
  };

  return (
    <TeacherForm
      formId={formId}
      onSubmit={handleUpdateTeacher}
      defaultValues={{
        id,
        name,
        nid,
        phone,
        dob: new Date(dob),
        bloodGroup,
        address,
        salary,
        education,
      }}
      isUpdate
    />
  );
};
