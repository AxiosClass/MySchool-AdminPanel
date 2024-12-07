import { useMemo } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Form } from '@/components/ui/form';
import { useAddTeacher } from './useAddTeacher';
import { BLOOD_GROUP } from '@/data/constants';
import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { DatePicker } from '@/components/shared/form/DatePicker';
import { TextInput } from '@/components/shared/form/TextInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ControlledSelect } from '@/components/shared/form/ControlledSelect';
import { ControlledTextAea } from '@/components/shared/form/ControlledTextArea';
import { CustomSheet } from '@/components/shared/CustomSheet';

export function AddTeacher() {
  const {
    form,
    handlers: { handleAddTeacher },
    states: { isOpen, setIsOpen, isLoading },
  } = useAddTeacher();

  const bloodGroups = useMemo(() => {
    return BLOOD_GROUP.map((each) => ({ label: each, value: each }));
  }, []);

  return (
    <CustomSheet
      title='Add Teacher'
      description="Please provide teacher' information"
      side='right'
      asChild
      control={{ isSheetOpen: isOpen, setIsSheetOpen: setIsOpen }}
      trigger={
        <Button className='gap-3'>
          <FaPlus />
          Add Teacher
        </Button>
      }
      className={{ content: 'p-0', header: 'px-6 pt-6' }}
    >
      <Form {...form}>
        <form
          style={{ height: `calc(100dvh - 100px)` }}
          className='flex grid-rows-[1fr_auto] flex-col gap-4 overflow-y-auto'
          onSubmit={handleAddTeacher}
        >
          <ScrollArea className='h-full px-6'>
            <div className='mt-6 grid grid-cols-2 gap-4 p-1'>
              <TextInput control={form.control} label='Name' name='name' placeholder='@: John Doe' />
              <TextInput control={form.control} label='Teacher Id' name='teacherId' placeholder='@: JDO' />
              <TextInput control={form.control} label='NID' name='nid' placeholder='@: 6612****' />
              <TextInput control={form.control} label='Phone' name='phone' placeholder='@: 015******' />
              <DatePicker control={form.control} label='Date of Birth' name='dob' />
              <ControlledSelect
                control={form.control}
                name='bloodGroup'
                label='Blood Group'
                placeholder='Select blood group'
                options={bloodGroups}
              />
              <div className='col-span-2'>
                <ControlledTextAea control={form.control} label='Address' name='address' placeholder='@ : Dhaka' />
              </div>
              <TextInput control={form.control} label='Salary' name='salary' placeholder='@: 30000' />
              <TextInput control={form.control} label='Degree Name' name='education.degree' placeholder='@: HSC' />
              <TextInput
                control={form.control}
                label='Passed Year'
                name='education.passedYear'
                type='number'
                placeholder='@: 2024'
              />
            </div>
          </ScrollArea>

          <div className='flex items-center justify-end gap-4 px-6'>
            <SheetClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </SheetClose>
            <Button disabled={isLoading}>{isLoading ? 'Adding Teacher' : 'Add Teacher'}</Button>
          </div>
        </form>
      </Form>
    </CustomSheet>
  );
}
