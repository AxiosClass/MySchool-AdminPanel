import { FaPlus } from 'react-icons/fa6';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/shared/form/TextInput';
import { CustomDialog } from '@/components/shared/CustomDialog';
import { useCreateClass } from './useCreateClass';
import { Button } from '@/components/ui/button';

export function CreateClass() {
  const {
    form,
    states: { isDialogOpen, isLoading, setIsDialogOpen },
    handlers: { handleCreateClass },
  } = useCreateClass();

  return (
    <CustomDialog
      control={{ isDialogOpen, setIsDialogOpen }}
      title='Create Class'
      description='Please provide class information'
      asChild
      trigger={
        <Button className='gap-3'>
          <FaPlus />
          Create Class
        </Button>
      }
    >
      <Form {...form}>
        <form className='flex flex-col gap-4' onSubmit={handleCreateClass}>
          <TextInput control={form.control} label='Name' name='name' placeholder='Input Class Name' />
          <TextInput control={form.control} label='Level' name='level' placeholder='Input Level' />
          <TextInput
            control={form.control}
            type='number'
            label='Monthly Fee'
            name='monthlyFee'
            placeholder='Input monthly fee'
          />
          <TextInput
            control={form.control}
            type='number'
            label='Admission Fee'
            name='admissionFee'
            placeholder='Input admission fee'
          />
          <Button disabled={isLoading} className='mt-4'>
            {isLoading ? 'Class Creating...' : 'Create Class'}
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
}
