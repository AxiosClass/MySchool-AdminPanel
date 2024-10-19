import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createClassSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  level: z.string().min(1, { message: 'Level is required' }),
});

export const useCreateClass = () => {
  const form = useForm<z.infer<typeof createClassSchema>>({
    resolver: zodResolver(createClassSchema),
    defaultValues: { name: '', level: '' },
  });

  const handleCreateClass = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return { form, handleCreateClass };
};
