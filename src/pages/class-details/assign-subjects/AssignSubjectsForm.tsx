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
import { Message, SearchInput } from '@/components/shared';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { errorMessageGen } from '@/helpers';
import { useSearch } from '@/hooks';
import { toast } from 'sonner';

export type TAssignSubjectsFormProps = {
  formId: string;
  classId: string;
  onOpenChange: (open: boolean) => void;
  defaultValues?: TAssignSubjectsForm;
};

export const AssignSubjectsForm = ({ formId, classId, onOpenChange, defaultValues }: TAssignSubjectsFormProps) => {
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
      onOpenChange(false);
    },
    onError: (error) => toast.error(errorMessageGen(error)),
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
    <Popover>
      <PopoverTrigger className='w-full rounded-md border px-3 py-2 data-[state=open]:border-primary data-[state=open]:ring-1 data-[state=open]:ring-primary'>
        <SelectedSubjects subjects={value} onRemove={onRemove} />
      </PopoverTrigger>
      <PopoverContent sideOffset={10} className='w-[--radix-popover-trigger-width] rounded-none border-none p-0'>
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
          <button
            type='button'
            className='transition duration-500 hover:rotate-90'
            onClick={() => onRemove(subject.id)}
          >
            <XIcon size={16} />
          </button>
        </Badge>
      ))}
    </div>
  );
};

type TSubjectSelectionProps = { selectedSubjects: TSubject[]; onAdd: (subject: TSubject) => void };

const SubjectSelection = ({ selectedSubjects, onAdd }: TSubjectSelectionProps) => {
  const { value, onSearchChange, searchTerm } = useSearch();

  const { data: subjects, isLoading } = useQuery({
    queryKey: [QK.SUBJECT, { searchTerm }],
    queryFn: () => getSubjects({ searchTerm }),
    select: (res) => res.data,
  });

  const remainingSubjects = useMemo(() => {
    const selectedSubjectSet = new Set(selectedSubjects.map((subject) => subject.id));
    return subjects?.filter((subject) => !selectedSubjectSet.has(subject.id)) || [];
  }, [subjects, selectedSubjects]);

  if (isLoading) return <SubjectSkeleton />;

  return (
    <div className='flex flex-col gap-4 py-4'>
      <div className='px-4'>
        <SearchInput value={value} onSearchChange={onSearchChange} placeholder='Search subject...' />
      </div>
      <div className='flex flex-col'>
        {remainingSubjects.length ? (
          remainingSubjects.map((subject) => (
            <button
              className='flex w-full items-center justify-between gap-2 border-b px-6 py-2 last:border-b-0 hover:bg-primary-100'
              key={subject.id}
              type='button'
              onClick={() => onAdd(subject)}
            >
              <div className='text-left'>
                <h3>{subject.name}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>{subject.description}</p>
              </div>
              <Badge>{subject.type}</Badge>
            </button>
          ))
        ) : (
          <Message message='No subject found' className='my-4' />
        )}
      </div>
    </div>
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
