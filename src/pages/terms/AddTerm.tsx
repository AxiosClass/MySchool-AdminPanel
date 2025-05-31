import { z } from 'zod';
import { memo } from 'react';
import { QK } from '@/api';
import { toast } from 'sonner';
import { addTerm } from '@/api/query';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionButton } from '@/components/ui/button';
import { CommonFormField, FormDialog } from '@/components/shared/form';
import { usePopupState } from '@/hooks';
import { errorMessageGen } from '@/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

const formId = QK.TERM + '_ADD';

const AddTerm = memo(() => {
  const { open, onOpenChange } = usePopupState();

  const qc = useQueryClient();
  const form = useForm<TAddTermForm>({ resolver: zodResolver(addTermSchema) });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: addTerm,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.TERM] });
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
  });

  const onAddTerms = form.handleSubmit((formData) => mutate({ ...formData }));

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
          <form id={formId} onSubmit={onAddTerms}>
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
