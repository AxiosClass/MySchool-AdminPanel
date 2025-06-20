import { QK } from '@/api';
import { z } from 'zod';
import { XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { CommonFormField } from '@/components/shared/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assignSubjects, getSubjects } from '@/api/query';
import { Message } from '@/components/shared';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { errorToast } from '@/helpers';
import { useSearch } from '@/hooks';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAssignSubjectStore } from './assignSubjectStore';
import { useStore } from 'zustand';

export type TAssignSubjectsFormProps = { formId: string; classId: string; defaultValues?: TAssignSubjectsForm };

export const AssignSubjectsForm = ({ formId, classId, defaultValues }: TAssignSubjectsFormProps) => {
  const store = useAssignSubjectStore();
  const setSheetOpen = useStore(store, (state) => state.setSheetOpen);

  const qc = useQueryClient();
  const form = useForm<TAssignSubjectsForm>({
    resolver: zodResolver(assignSubjectFormSchema),
    defaultValues: defaultValues || { subjects: [] },
  });

  const { mutate } = useMutation({
    mutationKey: [formId],
    mutationFn: assignSubjects,
    onSuccess: (res) => {
      toast.success(res.message);
      qc.invalidateQueries({ queryKey: [QK.CLASS, { classId }] });
      qc.invalidateQueries({ queryKey: [QK.SUBJECT, { classId }] });
      form.reset();
      setSheetOpen(false);
    },
    onError: errorToast,
  });

  const handleSubmit = form.handleSubmit((formData) => {
    const subjectIds = formData.subjects.map((subject) => subject.id);
    mutate({ classId, subjectIds });
  });

  return (
    <Form {...form}>
      <form className='space-y-4 p-1' id={formId} onSubmit={handleSubmit}>
        <CommonFormField control={form.control} name='subjects' label='Subjects'>
          {({ field }) => <SubjectMultiSelect value={field.value} onChange={field.onChange} />}
        </CommonFormField>
      </form>
    </Form>
  );
};

type TSubjectMultiSelectProps = { value: TSubject[]; onChange: (value: TSubject[]) => void };

const SubjectMultiSelect = ({ value, onChange }: TSubjectMultiSelectProps) => {
  const store = useAssignSubjectStore();
  const sheetOpen = useStore(store, (state) => state.sheetOpen);
  const popOpen = useStore(store, (state) => state.popOpen);
  const setPopOpen = useStore(store, (state) => state.setPopOpen);

  const onRemove = useCallback(
    (subjectId: string) => {
      const newValue = value.filter((v) => v.id !== subjectId);
      onChange(newValue);
    },
    [value, onChange],
  );

  const onAdd = useCallback(
    (subject: TSubject) => {
      onChange([...value, subject]);
    },
    [value, onChange],
  );

  return (
    <Popover open={popOpen && sheetOpen} onOpenChange={setPopOpen} modal>
      <PopoverTrigger className='w-full rounded-md border px-3 py-2 data-[state=open]:border-primary data-[state=open]:ring-1 data-[state=open]:ring-primary'>
        <SelectedSubjects subjects={value} onRemove={onRemove} />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className='w-[--radix-popover-trigger-width] rounded-none border-none p-0'
        onWheel={(e) => e.stopPropagation()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <SubjectSelection selectedSubjects={value} onAdd={onAdd} />
      </PopoverContent>
    </Popover>
  );
};

type TSelectedSubjectProps = { subjects: TSubject[]; onRemove: (subjectId: string) => void };

const SelectedSubjects = ({ subjects, onRemove }: TSelectedSubjectProps) => {
  if (!subjects.length) return <p className='text-left text-muted-foreground'>Select Subject</p>;

  return (
    <div className='flex flex-wrap gap-4'>
      {subjects.map((subject) => (
        <Badge key={subject.id} className='flex items-center gap-2'>
          {subject.name}
          <span
            className='transition duration-500 hover:rotate-90'
            onClick={(e) => {
              e.stopPropagation();
              onRemove(subject.id);
            }}
          >
            <XIcon size={16} />
          </span>
        </Badge>
      ))}
    </div>
  );
};

type TSubjectSelectionProps = { selectedSubjects: TSubject[]; onAdd: (subject: TSubject) => void };

const SubjectSelection = ({ selectedSubjects, onAdd }: TSubjectSelectionProps) => {
  const { value, onSearchChange } = useSearch();

  const { data: subjects, isLoading } = useQuery({
    queryKey: [QK.SUBJECT],
    queryFn: () => getSubjects({}),
    select: (res) => res.data,
  });

  const remainingSubjects = useMemo(() => {
    const selectedSubjectSet = new Set(selectedSubjects.map((subject) => subject.id));
    if (!value) return subjects?.filter((subject) => !selectedSubjectSet.has(subject.id)) || [];

    const lowerCaseValue = value.toLowerCase();
    return (
      subjects?.filter((subject) => {
        const lowerCaseSubjectName = subject.name.toLowerCase();
        return !selectedSubjectSet.has(subject.id) && lowerCaseSubjectName.includes(lowerCaseValue);
      }) || []
    );
  }, [value, subjects, selectedSubjects]);

  if (isLoading) return <SubjectSkeleton />;

  return (
    <Command shouldFilter={false}>
      <CommandInput value={value} onValueChange={onSearchChange} placeholder='Search for subjects' />
      <CommandList>
        <ScrollArea>
          <div className='max-h-72'>
            {remainingSubjects.map((subject) => (
              <CommandItem
                key={subject.id}
                className='flex w-full items-center justify-between gap-2 border-b px-6 py-2 last:border-b-0 hover:bg-primary-100'
                onSelect={() => onAdd(subject)}
              >
                <div className='text-left'>
                  <h3>{subject.name}</h3>
                  <p className='mt-1 text-sm text-muted-foreground'>{subject.description}</p>
                </div>
                <Badge>{subject.type}</Badge>
              </CommandItem>
            ))}
            <CommandEmpty>
              <Message message='No subject found' className='my-4' />
            </CommandEmpty>
          </div>
        </ScrollArea>
      </CommandList>
    </Command>
  );
};

const SubjectSkeleton = () => (
  <div className='w-full p-4'>
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className='flex items-center justify-between border-b p-2 last:border-b-0'>
        <div className='grow'>
          <Skeleton className='mb-2 h-6 w-1/3' />
          <Skeleton className='h-6 w-2/3' />
        </div>
        <Skeleton className='h-6 w-16' />
      </div>
    ))}
  </div>
);

// schema
const subjectSubSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  type: z.string(),
});

const assignSubjectFormSchema = z.object({
  subjects: subjectSubSchema.array().min(1, 'Please at least select one subject'),
});

// Types
type TSubject = z.infer<typeof subjectSubSchema>;
export type TAssignSubjectsForm = z.infer<typeof assignSubjectFormSchema>;
