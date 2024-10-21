import {
  Sheet,
  SheetContent,
  SheetDescription,
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Staff</SheetTitle>
          <SheetDescription>
            Please provide staff&apos; information
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            style={{ height: `calc(100dvh - 120px)` }}
            className='mt-4 flex flex-col gap-4 overflow-y-auto pr-4'
            onSubmit={handleAddStaff}
          >
            <div className='grid grid-cols-2 gap-4'>
              <TextInput
                form={form}
                label='Name'
                name='name'
                placeholder='@: John Doe'
              />
              <TextInput
                form={form}
                label='StaffId'
                name='userId'
                placeholder='@: John'
              />
              <TextInput
                form={form}
                label='NID'
                name='nid'
                placeholder='@: 6612****'
              />
              <TextInput
                form={form}
                label='Phone'
                name='phone'
                placeholder='@: 015******'
              />
              {/* to do => Date , blood Group */}
              <TextInput
                form={form}
                label='Salary'
                name='salary'
                placeholder='@: 30000'
              />
              <TextInput
                form={form}
                label='Designation'
                name='designation'
                placeholder='@: Teacher'
              />
              {/* to do => Address */}
              <TextInput
                form={form}
                label='Degree Name'
                name='education.degreeName'
                placeholder='@: HSC'
              />
              <TextInput
                form={form}
                label='Group'
                name='education.group'
                placeholder='@: Science'
              />
              <TextInput
                form={form}
                label='Result'
                name='education.result'
                type='number'
                placeholder='@: Science'
              />
              {/* to do => Roles */}
            </div>
            <Button className='mt-4'>Add Staff</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
