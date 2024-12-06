import { FaPlus } from 'react-icons/fa6';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useCreateClassroom } from './useCrateClassroom';
import { TextInput } from '@/components/shared/form/TextInput';
import { ControlledSelect } from '@/components/shared/form/ControlledSelect';
import { CustomDialog } from '@/components/shared/CustomDialog';
import { DialogFooter } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

export function CreateClassroom() {
  const {
    form,
    handleCreateClassroom,
    states: { isDialogOpen, setIsDialogOpen },
    data: { teachers },
    loaders: { isClassroomCreating, isTeacherFetching },
  } = useCreateClassroom();

  return (
    <>
      <CustomDialog
        title='Create Classroom'
        description='Provide with classroom information to create a new one.'
        control={{ isDialogOpen, setIsDialogOpen }}
        trigger={
          <Button className='gap-3'>
            <FaPlus />
            Create Classroom
          </Button>
        }
        asChild
      >
        <Form {...form}>
          <form onSubmit={handleCreateClassroom} className='flex flex-col gap-4'>
            <TextInput control={form.control} name='name' label='Classroom Name' placeholder='@: Modhumoti' />
            <ControlledSelect
              control={form.control}
              label='Class Teacher'
              name='classTeacherId'
              options={teachers}
              placeholder='Select Any Teacher'
              disabled={isTeacherFetching}
            />
            <DialogFooter className='mt-2'>
              <DialogClose asChild>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
              <Button disabled={isClassroomCreating}>{isClassroomCreating ? 'Processing' : 'Proceed'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
}
