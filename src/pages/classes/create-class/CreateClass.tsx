import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { TextInput } from '@/components/shared/form/TextInput';
import { useCreateClass } from './useCreateClass';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FaPlus } from 'react-icons/fa6';

export function CreateClass() {
  const {
    form,
    states: { isDialogOpen, isLoading, setIsDialogOpen },
    handlers: { handleCreateClass },
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
          <DialogDescription>Please provide class information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='flex flex-col gap-4' onSubmit={handleCreateClass}>
            <TextInput control={form.control} label='Name' name='name' placeholder='Input Class Name' />
            <TextInput control={form.control} label='Level' name='level' placeholder='Input Level' />
            <TextInput control={form.control} label='Monthly Fee' name='monthlyFee' placeholder='Input monthly fee' />
            <TextInput
              control={form.control}
              label='Admission Fee'
              name='admissionFee'
              placeholder='Input admission fee'
            />
            <Button disabled={isLoading} className='mt-4'>
              {isLoading ? 'Class Creating...' : 'Create Class'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
