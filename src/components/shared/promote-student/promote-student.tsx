import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { usePopupState } from '@/hooks';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const PromoteStudent = ({ studentId }: { studentId: string }) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <Button variant='outline' onClick={() => onOpenChange(true)} className='w-44 bg-white'>
        <TbRosetteDiscountCheckFilled className='size-4' /> Promote Student
      </Button>
    </>
  );
};

type TPromoteFormProps = { formId: string; onSubmit: (formData: TPromoteForm, reset: () => void) => void };
const PromoteForm = ({ formId, onSubmit }: TPromoteFormProps) => {
  const form = useForm<TPromoteForm>({
    resolver: zodResolver(promoteFormSchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit(formData, () => form.reset());
  });

  return (
    <Form {...form}>
      <form id={formId} className='flex flex-col gap-4' onSubmit={handleSubmit}></form>
    </Form>
  );
};

const ClassSelection = () => {};

const promoteFormSchema = z.object({
  classLevel: z.string().min(1, { message: 'Class is required' }),
  classroomId: z.string().min(1, { message: 'Please select a classroomId' }),
});

type TPromoteForm = z.infer<typeof promoteFormSchema>;
