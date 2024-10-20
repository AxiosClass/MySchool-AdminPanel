import {
  CREATE_CLASS,
  ICreateClassArgs,
  ICreateClassResponse,
} from './createClass.query';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const createClassSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
});

export const useCreateClass = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: { name: '', level: '' },
  });

  const [createClass, { loading }] = useMutation<
    ICreateClassResponse,
    ICreateClassArgs
  >(CREATE_CLASS);

  const handleCreateClass = form.handleSubmit(async (formData) => {
    const id = toast.loading('Class creating ...!');
    const { name, level } = formData;

    tryCatch({
      id,
      async tryFn() {
        await createClass({ variables: { name, level } });
        toast.success('Class created', { id });
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, isLoading: loading },
    handlers: { handleCreateClass },
    setters: { setIsDialogOpen },
  };
};
