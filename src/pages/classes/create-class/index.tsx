import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useCreateClass } from './useCreateClass';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/components/shared';
import { Form } from '@/components/ui/form';
import { FaPlus } from 'react-icons/fa6';

export function CreateClass() {
  const {
    form,
    states: { isDialogOpen, isLoading },
    handlers: { handleCreateClass },
    setters: { setIsDialogOpen },
  } = useCreateClass();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              control={form.control}
              label='Name'
              name='name'
              placeholder='Class Name'
            />
            <TextInput
              control={form.control}
              label='Level'
              name='level'
              placeholder='Level'
            />
            <Button disabled={isLoading} className='mt-4'>
              {isLoading ? 'Create Class' : 'Class Creating...'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
