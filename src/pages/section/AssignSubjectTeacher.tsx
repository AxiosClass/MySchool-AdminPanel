import { z } from 'zod';
import { QK } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CommonFormField, CommonSelect, FormDialog } from '@/components/shared/form';
import { Form } from '@/components/ui/form';
import { getTeacherList } from '@/api/query';
import { Button } from '@/components/ui/button';
import { UserPlusIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePopupState } from '@/hooks';
import { TooltipContainer } from '@/components/shared';

const formId = 'ASSIGN_SUBJECT';
type TAssignSubjectTeacherProps = { sectionId: string; subjectId: string };

export const AssignSubjectTeacher = ({ sectionId, subjectId }: TAssignSubjectTeacherProps) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <TooltipContainer label='Assign Teacher'>
        <Button onClick={() => onOpenChange(true)}>
          <UserPlusIcon size={16} />
        </Button>
      </TooltipContainer>

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Assign Teacher'
        submitButtonTitle='Assign'
        submitLoadingTitle='Assigning...'
      >
        <AssignSubjectForm onOpenChange={onOpenChange} />
      </FormDialog>
    </>
  );
};

type AssignSubjectFormProps = { onOpenChange: (open: boolean) => void };

const AssignSubjectForm = ({ onOpenChange }: AssignSubjectFormProps) => {
  const { data: teacherList, isLoading } = useQuery({
    queryKey: [QK.TEACHER, 'FOR_ASSIGN_TEACHER'],
    queryFn: getTeacherList,
    select: (res) => res.data.map((teacher) => ({ label: teacher.name, value: teacher.id })),
  });

  const form = useForm<TAssignTeacherForm>({
    resolver: zodResolver(assignTeacherSchema),
    defaultValues: { teacherId: '' },
  });

  return (
    <Form {...form}>
      <form id={formId}>
        <CommonFormField control={form.control} name='teacherId' label='Teacher'>
          {({ field }) => (
            <CommonSelect
              value={field.value}
              onChange={field.onChange}
              options={teacherList || []}
              disabled={isLoading}
              isLoading={isLoading}
              placeholder='Select Teacher'
            />
          )}
        </CommonFormField>
      </form>
    </Form>
  );
};

// schema
const assignTeacherSchema = z.object({
  teacherId: z.string().min(1, { message: 'Teacher id is required' }),
});

type TAssignTeacherForm = z.infer<typeof assignTeacherSchema>;
