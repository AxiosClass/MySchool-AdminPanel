import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { DatePicker, TextInput, ControlledSelect } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { BLOOD_GROUP } from '@/data/constants';
import { EUserRole } from '@/lib/types/user';
import { Form } from '@/components/ui/form';
import { useAddStaff } from './useAddStaff';
import { FaPlus } from 'react-icons/fa6';
import { ControlledTextAea } from '@/components/shared/form/ControlledTextArea';

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
            className='flex grid-rows-[1fr_auto] flex-col gap-4 overflow-y-auto'
            onSubmit={handleAddStaff}
          >
            <div className='h-full overflow-y-auto px-6'>
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
                <DatePicker
                  control={form.control}
                  label='Date of birth'
                  name='dob'
                />
                <ControlledSelect
                  control={form.control}
                  name='bloodGroup'
                  label='Blood Group'
                  placeholder='Select blood group'
                  options={BLOOD_GROUP}
                />
                <div className='col-span-2'>
                  <ControlledTextAea
                    control={form.control}
                    label='Address'
                    name='address'
                    placeholder='@ : Dhaka'
                  />
                </div>
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
                  placeholder='@: 5.00'
                />
                <ControlledSelect
                  control={form.control}
                  label='Role'
                  name='role'
                  placeholder='Select any role'
                  options={Object.values(EUserRole)}
                />
              </div>
            </div>

            <div className='flex items-center justify-end px-6'>
              <SheetClose asChild>
                <Button variant={'outline'}>Cancel</Button>
              </SheetClose>
              <Button>Add Staff</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
