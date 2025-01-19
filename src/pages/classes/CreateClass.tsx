import { QK } from '@/api';
import { ActionButton } from '@/components/ui/button';
import { FormDialog } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodNumber } from '@/helpers';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  monthlyFee: zodNumber({ min: 100, message: 'Minimum monthly fee is 100 taka' }),
  admissionFee: zodNumber({ min: 500, message: 'Minimum monthly fee is 500 taka' }),
});

type TCreateClassForm = z.infer<typeof createClassFormSchema>;

const formId = QK.CLASS + '_CREATE';

export const CreateClass = () => {
  const form = useForm<TCreateClassForm>({ resolver: zodResolver(createClassFormSchema) });
  const { open, onOpenChange } = usePopupState();

  return (
    <>
      <ActionButton actionType='ADD' label='Create Class' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Create Class'
        description='Provide following information to create a class'
        submitButtonTitle='Crate Class'
        submitLoadingTitle='Cratering Class...'
      >
        <Form {...form}>
          <form></form>
        </Form>
      </FormDialog>
    </>
  );
};
