import {
  GET_TEACHERS_FOR_CREATE_CLASSROOM,
  IGetTEacherFormCreateClassroomResponse,
} from '@/lib/queries';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ControlledSelect, TextInput } from '@/components/shared/form';
import { useCreateClassroom } from './useCrateClassroom';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FaPlus } from 'react-icons/fa6';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

export function CreateClassroom() {
  const { data: teachersData, loading: isTeachersDataLoading } =
    useQuery<IGetTEacherFormCreateClassroomResponse>(
      GET_TEACHERS_FOR_CREATE_CLASSROOM,
    );

  const teachers = useMemo(() => {
    return (
      teachersData?.staffs.map((teacher) => ({
        label: teacher.name,
        value: teacher.id,
      })) || []
    );
  }, [teachersData]);

  const {
    form,
    handleCreateClassroom,
    isLoading,
    states: { isDialogOpen, setIsDialogOpen },
  } = useCreateClassroom();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button className='gap-3'>
          <FaPlus />
          Create Classroom
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Classroom</DialogTitle>
          <DialogDescription>
            Provide with classroom information to create a new one.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleCreateClassroom}
            className='flex flex-col gap-4'
          >
            <TextInput
              control={form.control}
              name='name'
              label='Classroom Name'
              placeholder='@: Modhumoti'
            />
            <ControlledSelect
              control={form.control}
              label='Class Teacher'
              name='teacherId'
              options={teachers}
              placeholder='Select Any Teacher'
              disabled={isTeachersDataLoading}
            />
            <DialogFooter className='mt-2'>
              <DialogClose asChild>
                <Button variant={'outline'}>Cancel</Button>
              </DialogClose>
              <Button disabled={isLoading}>
                {isLoading ? 'Processing' : 'Proceed'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
