import { z } from 'zod';
import { QK } from '@/api';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetTeacherList, usePopupState } from '@/hooks';
import { CommonFormField, CommonSelect, FormDialog } from '../form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateClassroom } from '@/api/query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TooltipContainer } from '../TooltipContainer';
import { PenLineIcon } from 'lucide-react';

type TUpdateSectionProps = { sectionId: string; name: string; classLevel: string; teacherId: string };

export const UpdateSection = ({ sectionId, name, teacherId }: TUpdateSectionProps) => {
  const { open, onOpenChange } = usePopupState();
  const { data: teacherList, isLoading } = useGetTeacherList();

  const formId = `${QK.CLASSROOM}_UPDATE_${sectionId}`;
  const qc = useQueryClient();

  const form = useForm<TUpdateSectionForm>({
    resolver: zodResolver(updateSectionSchema),
    defaultValues: { name, classTeacherId: teacherId },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: updateClassroom,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS] });
      onOpenChange(false);
    },
  });

  const handleUpdateSection = form.handleSubmit((formData) => {
    mutate({ ...formData, classroomId: sectionId });
  });

  return (
    <>
      <TooltipContainer label='Update Class'>
        <Button
          variant='outline'
          size='icon'
          onClick={(e) => {
            onOpenChange(true);
            e.stopPropagation();
          }}
          className='shrink-0 bg-transparent'
        >
          <PenLineIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Section'
        description='Provide following information to create Section'
        submitButtonTitle='Create Section'
        submitLoadingTitle='Creating...'
      >
        <Form {...form}>
          <form className='space-y-3' id={formId} onSubmit={handleUpdateSection}>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input {...field} placeholder='Input name' />}
            </CommonFormField>
            <CommonFormField control={form.control} name='classTeacherId' label='Class Teacher'>
              {({ field }) => (
                <CommonSelect
                  value={field.value}
                  onChange={field.onChange}
                  placeholder='Select Teacher'
                  options={teacherList || []}
                  isLoading={isLoading}
                />
              )}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
};

const updateSectionSchema = z.object({
  name: z.string().min(1, { message: 'Classroom name is required' }),
  classTeacherId: z.string().min(1, { message: 'TeacherId is required' }),
});

type TUpdateSectionForm = z.infer<typeof updateSectionSchema>;
