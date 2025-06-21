import { QK } from '@/api';
import { MdPayments } from 'react-icons/md';
import { useCallback, useMemo, useState } from 'react';
import { PageTitle } from '@/components/shared/PageTitle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { getStudentListForPayment, TGetStudentListForPaymentResult } from '@/api/query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getInitials } from '@/helpers';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetStudentInfo, usePopupState } from '@/hooks';
import { StudentProfile } from '@/components/shared/student-profile';
import { StudentProfileSkeleton } from '@/components/loader';
import { MakePayment, Message } from '@/components/shared';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { GiveDiscount } from '@/components/shared/give-discount';

export default function TakePaymentPage() {
  const [studentId, setStudentId] = useState('');
  const onStudentIdChange = useCallback((value: string) => setStudentId(value), []);

  return (
    <>
      <PageTitle title='Take Payment' />
      <ScrollArea className='h-[calc(100vh-5rem)] px-6'>
        <section className='my-6 space-y-6'>
          <Card className='bg-white p-6'>
            <CardHeader className='items-center'>
              <div className='flex size-16 items-center justify-center rounded-full bg-primary-100/40'>
                <MdPayments className='size-10 text-primary-600' />
              </div>

              <CardTitle className='pt-1 text-lg'>Take Payment</CardTitle>
              <CardDescription>Please select a student to start the process!</CardDescription>
            </CardHeader>

            <CardContent>
              <StudentSelection studentId={studentId} onStudentIdChange={onStudentIdChange} />
            </CardContent>
          </Card>

          <StudentProfileFetcher studentId={studentId} />
        </section>
      </ScrollArea>
    </>
  );
}

type TStudentSelectionProps = { studentId: string; onStudentIdChange: (studentId: string) => void };
const StudentSelection = ({ studentId, onStudentIdChange }: TStudentSelectionProps) => {
  const { open, onOpenChange } = usePopupState();
  const [input, setInput] = useState('');

  const { data: studentMap, isLoading } = useQuery({
    queryKey: [QK.STUDENT, 'LIST', { for: 'PAYMENT' }],
    queryFn: getStudentListForPayment,
    select: (res) => {
      return res.data.reduce((acc: Record<string, TGetStudentListForPaymentResult[number]>, student) => {
        acc[student.id] = student;
        return acc;
      }, {});
    },
  });

  const selectedStudentDisplay = useMemo(() => {
    const student = studentMap?.[studentId];
    if (!student) return <p className='text-muted-foreground'>Select A Student</p>;

    return (
      <div className='flex items-center gap-2 font-semibold'>
        <div className='flex size-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 text-white'>
          <span>{getInitials(student.name || '')}</span>
        </div>
        <p>{student.name}</p>
        <p>({studentId})</p>
      </div>
    );
  }, [studentId, studentMap]);

  const filteredStudents = useMemo(() => {
    const studentArray = Object.values(studentMap || {});
    if (!input) return studentArray;
    const lowerCaseInput = input.toLowerCase();

    return studentArray.filter((student) => {
      const { name, id } = student;
      const lowerCaseName = name.toLowerCase();
      return lowerCaseName.includes(lowerCaseInput) || id.includes(lowerCaseInput);
    });
  }, [input, studentMap]);

  if (isLoading) return <Skeleton className='h-14 w-full' />;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className='flex h-14 w-full items-center justify-start rounded-md border bg-transparent px-4 py-2'>
          {selectedStudentDisplay}
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[var(--radix-popover-trigger-width)]'>
        <Command shouldFilter={false}>
          <CommandInput value={input} onValueChange={setInput} placeholder='Search by student name,id' />
          <CommandList>
            <CommandEmpty>
              <Message message='No Student Found' />
            </CommandEmpty>
            {filteredStudents.map((student) => (
              <StudentItem
                key={student.id}
                {...student}
                onSelect={(id) => {
                  onStudentIdChange(id);
                  onOpenChange(false);
                }}
              />
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type TStudentItemProps = TGetStudentListForPaymentResult[number] & { onSelect: (id: string) => void };
const StudentItem = ({ id, name, classroomName, classLevel, onSelect }: TStudentItemProps) => (
  <CommandItem onSelect={() => onSelect(id)}>
    <div className='flex items-center gap-4 py-2'>
      <div className='flex size-12 items-center justify-center rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 text-white'>
        <span>{getInitials(name)}</span>
      </div>
      <div className='space-y-1'>
        <CardTitle>{name}</CardTitle>
        <p className='text-muted-foreground'>ID : # {id}</p>
        <p className='text-muted-foreground'>
          {classroomName} ({classLevel})
        </p>
      </div>
    </div>
  </CommandItem>
);

const StudentProfileFetcher = ({ studentId }: { studentId: string }) => {
  const { data: studentInfo, isLoading } = useGetStudentInfo(studentId);

  if (isLoading) return <StudentProfileSkeleton className='m-0' />;
  if (!studentInfo) return null;

  return (
    <StudentProfile {...studentInfo} showPaymentInfo>
      <div className='ml-auto flex items-center gap-4'>
        <GiveDiscount studentId={studentId} />
        <MakePayment studentId={studentId} />
      </div>
    </StudentProfile>
  );
};
