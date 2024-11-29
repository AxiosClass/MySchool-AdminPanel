import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tryCatch } from '@/helpers/tryCatch';
import { zodResolver } from '@hookform/resolvers/zod';
import { numberGenerator } from '@/helpers/zodHelper';
import { useCreateClassMutation } from '@/data-fetching/hooks/class';

const createClassFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
  monthlyFee: numberGenerator({ min: 0, minErrorMessage: 'Monthly fee can not be negative' }),
  admissionFee: numberGenerator({ min: 0, minErrorMessage: 'Admission fee can not be negative' }),
});

type TCreateClassFormSchema = z.infer<typeof createClassFormSchema>;

export const useCreateClass = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { createClassMutation, isLoading } = useCreateClassMutation();

  const form = useForm<TCreateClassFormSchema>({
    resolver: zodResolver(createClassFormSchema),
    defaultValues: { name: '', level: '', admissionFee: 0, monthlyFee: 0 },
  });

  const handleCreateClass = form.handleSubmit(async (formData) => {
    const id = toast.loading('Class creating ...!');
    const { name, level, admissionFee, monthlyFee } = formData;

    tryCatch({
      id,
      tryFn: async () => {
        const response = await createClassMutation.mutateAsync({ name, level, admissionFee, monthlyFee });
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
