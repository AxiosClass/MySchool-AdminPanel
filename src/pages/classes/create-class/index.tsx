import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6';
import { Form } from '@/components/ui/form';
import { useCreateClass } from './useCreateClass';
import { TextInput } from '@/components/shared';

export function CreateClass() {
  const { form, handleCreateClass } = useCreateClass();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-3'>
          <FaPlus />
          Create Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Class</DialogTitle>
          <DialogDescription>
            Please provide class information
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='flex flex-col gap-4' onSubmit={handleCreateClass}>
            <TextInput
              form={form}
              label='Name'
              name='name'
              placeholder='Class Name'
            />
            <TextInput
              form={form}
              label='Level'
              name='level'
              placeholder='Level'
            />
            <Button className='mt-4'>Create Class</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
