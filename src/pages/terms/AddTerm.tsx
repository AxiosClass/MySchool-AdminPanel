import { QK } from '@/api';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { ActionButton } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { usePopupState } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formId = QK.TERM + '_ADD';

const AddTerm = memo(() => {
  const { open, onOpenChange } = usePopupState();
  const form = useForm<TAddTermForm>({ resolver: zodResolver(addTermSchema) });

  return (
    <>
      <ActionButton actionType='ADD' label='Add Term' onClick={() => onOpenChange(true)} />
      <FormDialog
        formId={formId}
        open={open}
        onOpenChange={onOpenChange}
        title='Add Term'
        description='Provide following information'
        submitButtonTitle='Add'
        submitLoadingTitle='Adding...'
      >
        <Form {...form}>
          <form id={formId}>
            <CommonFormField control={form.control} name='name' label='Name'>
              {({ field }) => <Input placeholder='Enter name' {...field} />}
            </CommonFormField>
          </form>
        </Form>
      </FormDialog>
    </>
  );
});

AddTerm.displayName = 'AddTerm';

const addTermSchema = z.object({ name: z.string().min(1, 'Name is required') });
type TAddTermForm = z.infer<typeof addTermSchema>;

// exports
export { AddTerm };
