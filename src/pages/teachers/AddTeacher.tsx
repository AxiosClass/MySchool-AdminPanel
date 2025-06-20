import { QK } from '@/api';
import { toast } from 'sonner';
import { addTeacher } from '@/api/query';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormSheet } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { TeacherForm, TTeacherForm } from './TeacherForm';
import { errorToast } from '@/helpers';
import { memo } from 'react';

export const AddTeacher = memo(() => {
  const formId = QK.TEACHER + '_CREATE';
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();
  const { mutate } = useMutation({ mutationKey: [formId], mutationFn: addTeacher });

  const handleAddTeacher = (formData: TTeacherForm, reset: () => void) => {
    mutate(
      { ...formData },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          onOpenChange(false);
          qc.invalidateQueries({ queryKey: [QK.TEACHER] });
          qc.invalidateQueries({ queryKey: [QK.CLASSROOM] });
          qc.invalidateQueries({ queryKey: [QK.SUBJECT] });
          reset();
        },
        onError: errorToast,
      },
    );
  };

  return (
    <>
      <ActionButton actionType='ADD' label='Add Teacher' onClick={() => onOpenChange(true)} />
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Add Teacher'
        description='Please enter the teacher details'
        submitButtonTitle='Add Teacher'
        submitLoadingTitle='Adding...'
      >
        <TeacherForm
          formId={formId}
          defaultValues={{
            id: '',
            name: '',
            nid: '',
            phone: '',
            dob: new Date(),
            bloodGroup: '',
            address: '',
            education: { degree: '', passedYear: '' },
          }}
          onSubmit={handleAddTeacher}
        />
      </FormSheet>
    </>
  );
});

AddTeacher.displayName = 'AddTeacher';
