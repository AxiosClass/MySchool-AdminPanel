import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClassMutation } from '@/data-fetching/hooks/class';

const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
});

type TCreateClassFormSchema = z.infer<typeof createClassFormSchema>;

export const useCreateClass = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addClassMutation, isLoading } = useCreateClassMutation();

  const form = useForm<TCreateClassFormSchema>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: { name: '', level: '' },
  });

  const handleCreateClass = form.handleSubmit(async (formData) => {
    const id = toast.loading('Class creating ...!');
    const { name, level } = formData;

    tryCatch({
      id,
      async tryFn() {
        const response = await addClassMutation.mutateAsync({ name, level });
        toast.success(response.message, { id });
        setIsDialogOpen(false);
      },
    });
  });

  return {
    form,
    states: { isDialogOpen, setIsDialogOpen, isLoading },
    handlers: { handleCreateClass },
  };
};
