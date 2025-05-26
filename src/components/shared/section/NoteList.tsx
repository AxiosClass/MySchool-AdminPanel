import { QK } from '@/api';
import { getNotes } from '@/api/query';
import { PostCardLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { Message } from '../Message';
import { NoteCard } from './NoteCard';
import { cn } from '@/lib/utils';

type TNoteListProps = { sectionId: string; className?: string };

export const NoteList = ({ sectionId, className }: TNoteListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.NOTE, { sectionId }],
    queryFn: () => getNotes(sectionId),
    select: (res) => res.data,
  });

  if (isLoading) return <PostCardLoader />;
  if (!data?.length) return <Message message='No note found!' />;

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      {data.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
};
