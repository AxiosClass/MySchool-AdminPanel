import { QK } from '@/api';
import { usePopupState } from '@/hooks';
import { FormSheet } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStudent } from '@/api/query';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';
import { StudentForm, TStudentForm } from '@/components/shared/student-form/student-form';
import { useMemo } from 'react';

export const AddStudent = () => {
  const { open, onOpenChange } = usePopupState();

  const formId = QK.STUDENT + '_CREATE';
  const qc = useQueryClient();

  const defaultValues = useMemo(() => {
    return {
      name: '',
      birthId: '',
      class: '',
      classroomId: '',
      bloodGroup: '',
      parents: { fatherName: '', motherName: '' },
      guardian: { name: '', phone: '', relation: '' },
      address: '',
      dob: new Date(),
    };
  }, []);

  // mutation
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: addStudent });

  // handler
  const handleAddStudent = (formData: TStudentForm, reset: () => void) => {
    mutate(
      { ...formData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          qc.invalidateQueries({ queryKey: [QK.STUDENT] });
          reset();
          onOpenChange(false);
        },
        onError: (error) => errorToast(error),
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Add Student' onClick={() => onOpenChange(true)} />
      <FormSheet
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Student'
        description='Please fill the form below to add a new student'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <StudentForm formId={formId} defaultValues={defaultValues} onSubmit={handleAddStudent} />
      </FormSheet>
    </>
  );
};
