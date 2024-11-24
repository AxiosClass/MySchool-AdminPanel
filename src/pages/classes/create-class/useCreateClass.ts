import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateClassMutation } from '@/data-fetching/mutations/createClass';

const createClassSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
});

export const useCreateClass = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addClassMutation, isCreatingClass } = useCreateClassMutation();

  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: { name: '', level: '' },
  });

  const handleCreateClass = form.handleSubmit(async (formData) => {
    const id = toast.loading('Class creating ...!');
    const { name, level } = formData;

    tryCatch({
      id,
      async tryFn() {
        const response = await addClassMutation.mutateAsync({ name, level });
        console.log(response);
        if (!response.ok) throw new Error(response.message);

        toast.success('Class created', { id });
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen, isCreatingClass },
    handlers: { handleCreateClass },
  };
};
