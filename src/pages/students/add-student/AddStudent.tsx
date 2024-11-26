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

import { FaPlus } from 'react-icons/fa6';
import { Form } from '@/components/ui/form';
import { useAddStudent } from './useAddStudent';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DatePicker } from '@/components/shared/form/DatePicker';
import { TextInput } from '@/components/shared/form/TextInput';
import { ControlledSelect } from '@/components/shared/form/ControlledSelect';
import { ControlledTextAea } from '@/components/shared/form/ControlledTextArea';

export function AddStudent() {
  const {
    form,
    handler: { handleAddStudent },
    data: { classes, classrooms, bloodGroups },
    loading: { isClassesLoading, isClassroomLoading, isAddStudentLoading },
    watching: { selectedClass },
    states: { isOpen, setIsOpen },
  } = useAddStudent();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className='gap-3'>
          <FaPlus /> Add Student
        </Button>
      </SheetTrigger>
      <SheetContent className='px-0'>
        <SheetHeader className='px-6'>
          <SheetTitle>Admin New Student</SheetTitle>
          <SheetDescription>Provide student&apos;s Information</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={handleAddStudent}>
            <ScrollArea className='h-[calc(100dvh-140px)] px-4'>
              <div className='mt-6 grid grid-cols-2 gap-x-6 gap-y-3 px-2'>
                <h2 className='col-span-2 text-base font-semibold'>Basic Info</h2>
                <TextInput control={form.control} name='name' label='Name' placeholder='Input Student Name' />
                <TextInput control={form.control} name='birthId' label='Birth Id' placeholder='Input BirthId' />
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
                  disabled={isClassroomLoading || !selectedClass}
                  placeholder='Choose any classroom'
                />
                <ControlledSelect
                  control={form.control}
                  name='bloodGroup'
                  label='Blood Group'
                  options={bloodGroups}
                  placeholder='Choose any blood group'
                />
                <DatePicker control={form.control} label='Date of Birth' name='dob' />
                <ControlledTextAea
                  className='col-span-2'
                  control={form.control}
                  name='address'
                  label='Address'
                  placeholder='Input Address'
                />
                <h2 className='col-span-2 mt-4 text-base font-semibold'>Parent's Info</h2>
                <TextInput
                  control={form.control}
                  name='parents.fatherName'
                  label='Father Name'
                  placeholder='Input Father Name'
                />
                <TextInput
                  control={form.control}
                  name='parents.motherName'
                  label='Mother Name'
                  placeholder='Input Mother Name'
                />
                <TextInput
                  control={form.control}
                  name='guardian.name'
                  label='Guardian Name'
                  placeholder='Input Guardian Name'
                />
                <TextInput
                  control={form.control}
                  name='guardian.phone'
                  label='Guardian Phone Number'
                  placeholder='Input Guardian Phone Number'
                />
                <TextInput
                  className='col-span-2'
                  control={form.control}
                  name='guardian.relation'
                  label='Guardian Relation With Student'
                  placeholder='Input Guardian Phone Number'
                />
              </div>
            </ScrollArea>

            <SheetFooter className='px-6'>
              <SheetClose asChild>
                <Button variant='outline'>Cancel</Button>
              </SheetClose>
              <Button disabled={isAddStudentLoading}>
                {isAddStudentLoading ? 'Adding Student...' : 'Add Student'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
