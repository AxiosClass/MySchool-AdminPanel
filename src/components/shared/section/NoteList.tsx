import { cn } from '@/lib/utils';
import { QK } from '@/api';
import { getNotes } from '@/api/query';
import { PostCardLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { Message } from '../Message';
import { NoteCard } from './NoteCard';
import { useGetSubjectListFormClassroom } from '@/hooks';
import { useCallback, useMemo, useState } from 'react';
import { CommonSelect } from '../form';

type TNoteListProps = { sectionId: string; className?: string };

export const NoteList = ({ sectionId, className }: TNoteListProps) => {
  const [subjectId, setSubjectId] = useState('');
  const onSubjectIdChange = useCallback((subjectId: string) => setSubjectId(subjectId), []);

  return (
    <section className='flex grow flex-col gap-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-xl font-semibold'>Note List.</h1>
        <SubjectFilter sectionId={sectionId} subjectId={subjectId} onSubjectIdChange={onSubjectIdChange} />
      </div>
      <Notes sectionId={sectionId} subjectId={subjectId} className={className} />
    </section>
  );
};

type TSubjectFilterProps = { sectionId: string; subjectId: string; onSubjectIdChange: (value: string) => void };
const SubjectFilter = ({ sectionId, subjectId, onSubjectIdChange }: TSubjectFilterProps) => {
  const { data, isLoading } = useGetSubjectListFormClassroom(sectionId);

  const subjectIdOptions = useMemo(() => {
    const options = data?.map((subject) => ({ label: subject.subjectName, value: subject.subjectId })) || [];
    return [{ label: 'All', value: 'all' }, ...options];
  }, [data]);

  return (
    <CommonSelect
      className='max-w-72'
      value={subjectId}
      onChange={onSubjectIdChange}
      options={subjectIdOptions}
      isLoading={isLoading}
    />
  );
};

type TNotesProps = { subjectId: string; sectionId: string; className?: string };
const Notes = ({ sectionId, subjectId, className }: TNotesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.NOTE, { sectionId, ...(subjectId && { subjectId }) }],
    queryFn: () => getNotes(sectionId, { ...(subjectId && subjectId !== 'all' && { subjectId }) }),
    select: (res) => res.data,
  });

  if (isLoading) return <PostCardLoader />;
  if (!data?.length) return <Message message='No note found!' className='my-6' />;

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
};
