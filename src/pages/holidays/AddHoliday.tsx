import { z } from 'zod';
import { QK } from '@/api';
import { toast } from 'sonner';
import { addHoliday } from '@/api/query';
import { useForm } from 'react-hook-form';
import { usePopupState } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormSheet, DatePicker, CommonFormField } from '@/components/shared/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionButton } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const AddHoliday = () => {
  const formId = QK.HOLIDAY + '_CREATE';
  const qc = useQueryClient();
  const { open, onOpenChange } = usePopupState();

  const form = useForm<TAddHolidayForm>({
    resolver: zodResolver(addHolidayFormSchema),
    mode: 'onChange',
    defaultValues: { name: '', description: '', startDate: new Date(), endDate: new Date() },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addHoliday,
    onSuccess: (res) => {
      toast.success(res.message);
      onOpenChange(false);
      qc.invalidateQueries({ queryKey: [QK.HOLIDAY] });
      qc.invalidateQueries({ queryKey: [QK.NOTICE] });
      qc.invalidateQueries({ queryKey: [QK.ATTENDANCE] });
    },
  });

  const handleAddHoliday = form.handleSubmit((formData) => {
    const holidayData = {
      ...formData,
      startDate: formData.startDate.toISOString(),
      endDate: formData.endDate.toISOString(),
    };
    mutate(holidayData);
  });

  return (
    <>
      <ActionButton actionType='ADD' label='Add Holiday' onClick={() => onOpenChange(true)} />
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        formId={formId}
        title='Add Holiday'
        description='Please enter the holiday details'
        submitButtonTitle='Add Holiday'
        submitLoadingTitle='Adding...'
      >
        <Form {...form}>
          <form id={formId} onSubmit={handleAddHoliday} className='grid grid-cols-2 gap-4 p-1'>
            <CommonFormField control={form.control} name='startDate' label='Start Date'>
              {({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
            </CommonFormField>
            <CommonFormField control={form.control} name='endDate' label='End Date'>
              {({ field }) => <DatePicker value={field.value} onChange={field.onChange} />}
            </CommonFormField>
            <CommonFormField control={form.control} name='name' label='Name' formItemClassName='col-span-2'>
              {({ field }) => <Input {...field} placeholder='Input holiday name' />}
            </CommonFormField>
            <CommonFormField
              control={form.control}
              name='description'
              label='Description'
              formItemClassName='col-span-2'
            >
              {({ field }) => <Textarea {...field} placeholder='Input description' />}
            </CommonFormField>
          </form>
        </Form>
      </FormSheet>
    </>
  );
};

// schemas
const addHolidayFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    startDate: z.date({ message: 'Invalid date' }),
    endDate: z.date({ message: 'Invalid date' }),
  })
  .superRefine((values, ctx) => {
    if (values.endDate < values.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'End date must be after start date',
        path: ['endDate'],
      });
    }
  });

// types
type TAddHolidayForm = z.infer<typeof addHolidayFormSchema>;
