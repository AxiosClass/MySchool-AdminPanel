import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6';
import { useAddStudent } from './useAddStudent';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ControlledSelect, TextInput } from '@/components/shared/form';

export function AddStudent() {
  const {
    form,
    handleAddStudent,
    data: { classes, classrooms, bloodGroups },
    loading: { isClassesLoading, isClassroomLoading },
    watching: { classLevel },
  } = useAddStudent();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='gap-3'>
          <FaPlus /> Add Student
        </Button>
      </SheetTrigger>
      <SheetContent className='px-0'>
        <SheetHeader className='px-6'>
          <SheetTitle>Admin New Student</SheetTitle>
          <SheetDescription>
            Provide student&apos;s Information
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={handleAddStudent}>
            <ScrollArea className='h-[calc(100dvh-140px)] px-4'>
              <div className='mt-6 grid grid-cols-2 gap-x-6 gap-y-3 px-2'>
                <TextInput
                  control={form.control}
                  name='name'
                  label='Name'
                  placeholder='@: John Doe'
                />
                <TextInput
                  control={form.control}
                  name='birthId'
                  label='Birth Id'
                  placeholder='@: 6943-4490'
                />
                <ControlledSelect
                  control={form.control}
                  name='class'
                  label='Class'
                  options={classes}
                  disabled={isClassesLoading}
                  placeholder='Choose any class'
                />
                <ControlledSelect
                  control={form.control}
                  name='classroomId'
                  label='Classroom'
                  options={classrooms}
                  disabled={isClassroomLoading || !classLevel}
                  placeholder='Choose any classroom'
                />

                <ControlledSelect
                  control={form.control}
                  name='bloodGroup'
                  label='Blood Group'
                  options={bloodGroups}
                  placeholder='Choose any blood group'
                />
              </div>
            </ScrollArea>

            <SheetFooter className='px-6'>
              <SheetClose asChild>
                <Button variant='outline'>Cancel</Button>
              </SheetClose>
              <Button>Add Student</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
