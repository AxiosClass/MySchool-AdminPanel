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

import { TextInput } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAddStaff } from './useAddStaff';
import { FaPlus } from 'react-icons/fa6';

export function AddStaff() {
  const { form, handleAddStaff } = useAddStaff();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='gap-3'>
          <FaPlus />
          Add Staff
        </Button>
      </SheetTrigger>
      <SheetContent className='p-0'>
        <SheetHeader className='px-6 py-4'>
          <SheetTitle>Add Staff</SheetTitle>
          <SheetDescription>
            Please provide staff&apos; information
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            style={{ height: `calc(100dvh - 120px)` }}
            className='flex grid-rows-[1fr_auto] flex-col gap-4 overflow-y-auto px-6'
            onSubmit={handleAddStaff}
          >
            <div className='h-full'>
              <div className='grid grid-cols-2 gap-4'>
                <TextInput
                  control={form.control}
                  label='Name'
                  name='name'
                  placeholder='@: John Doe'
                />
                <TextInput
                  control={form.control}
                  label='StaffId'
                  name='userId'
                  placeholder='@: John'
                />
                <TextInput
                  control={form.control}
                  label='NID'
                  name='nid'
                  placeholder='@: 6612****'
                />
                <TextInput
                  control={form.control}
                  label='Phone'
                  name='phone'
                  placeholder='@: 015******'
                />
                {/* to do => Date , blood Group */}
                <TextInput
                  control={form.control}
                  label='Salary'
                  name='salary'
                  placeholder='@: 30000'
                />
                <TextInput
                  control={form.control}
                  label='Designation'
                  name='designation'
                  placeholder='@: Teacher'
                />
                {/* to do => Address */}
                <TextInput
                  control={form.control}
                  label='Degree Name'
                  name='education.degreeName'
                  placeholder='@: HSC'
                />
                <TextInput
                  control={form.control}
                  label='Group'
                  name='education.group'
                  placeholder='@: Science'
                />
                <TextInput
                  control={form.control}
                  label='Result'
                  name='education.result'
                  type='number'
                  placeholder='@: Science'
                />
                {/* to do => Roles */}
              </div>
            </div>

            <SheetFooter className='flex items-center justify-end'>
              <SheetClose asChild>
                <Button variant={'outline'}>Cancel</Button>
              </SheetClose>
              <Button>Add Staff</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
