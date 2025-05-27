import moment from 'moment';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CalendarIcon, UserIcon, FileTextIcon, ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { TGetNotesQueryResult } from '@/api/query';
import { dateFormatString } from '@/data';
import { usePopupState } from '@/hooks';
import { ActionMenu } from '../ActionMenu';
import { EditNote } from './EditNote';
import { useAuthStore } from '@/stores/auth';

type TNoteCardProps = { note: TGetNotesQueryResult[number] };

export const NoteCard = ({ note }: TNoteCardProps) => {
  return (
    <Card className='w-full border border-input shadow-sm transition-shadow duration-200 hover:shadow-md'>
      <NoteHeader note={note} />
      <CardContent className='mt-1 space-y-4'>
        <p className='leading-relaxed text-black/80'>{note.description}</p>
        {!!note.media?.length && <NoteAttachments media={note.media} />}
      </CardContent>
    </Card>
  );
};

const NoteHeader = ({ note }: { note: TNoteCardProps['note'] }) => {
  const user = useAuthStore((state) => state.user);
  const formattedDate = moment(note.createdAt).format(dateFormatString.basic);

  return (
    <CardHeader className='pb-3'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-3'>
          <Avatar className='size-12'>
            <AvatarFallback className='bg-primary-100 text-2xl font-bold uppercase text-primary'>
              {note.teacher.name?.[0] || <UserIcon className='h-5 w-5 text-muted-foreground' />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-lg font-semibold leading-tight'>{note.title}</h3>
            <div className='mt-1 flex items-center gap-6 text-sm text-muted-foreground'>
              <InfoItem icon={<UserIcon className='h-3 w-3' />} text={note.teacher.name} />
              <InfoItem icon={<CalendarIcon className='h-3 w-3' />} text={formattedDate} />
            </div>
          </div>
        </div>

        {!!note.media?.length && (
          <Badge variant='outline' className='ml-auto flex items-center space-x-1'>
            {getMediaIcon(note.media[0].type)}
            <span>{note.media.length}</span>
          </Badge>
        )}

        {user?.id === note.teacher.id && <NoteAction note={note} />}
      </div>
    </CardHeader>
  );
};

const NoteAction = ({ note }: { note: TNoteCardProps['note'] }) => {
  const { open, onOpenChange } = usePopupState();

  return (
    <ActionMenu open={open} onOpenChange={onOpenChange}>
      <EditNote note={note} />
    </ActionMenu>
  );
};

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className='flex items-center space-x-1'>
    {icon}
    <span>{text}</span>
  </div>
);

const NoteAttachments = ({ media }: { media: TNoteCardProps['note']['media'] }) => {
  return (
    <div className='space-y-3'>
      <h4 className='flex items-center space-x-2 text-sm font-medium text-gray-600'>
        <span>Attachments</span>
      </h4>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {media?.map((m) => <MediaPreview key={m.id} media={m} />)}
      </div>
    </div>
  );
};

const MediaPreview = ({ media }: { media: NonNullable<TNoteCardProps['note']['media']>[number] }) => {
  const isImage = media.type.startsWith('image/');

  return (
    <div className='group relative'>
      {isImage ? (
        <img
          src={media.url || '/placeholder.svg'}
          alt='Note attachment'
          className='h-40 w-full rounded-lg border border-input object-cover transition-colors group-hover:border-gray-300'
        />
      ) : (
        <a
          href={media.url}
          download
          target='_blank'
          className='flex h-40 w-full items-center justify-center rounded-lg border border-input bg-background transition-colors group-hover:bg-gray-100'
        >
          <FileTextIcon className='size-6 text-muted-foreground' />
        </a>
      )}
      <div className='absolute right-2 top-2 rounded-full bg-white/90 p-1 backdrop-blur-sm'>
        {getMediaIcon(media.type)}
      </div>
    </div>
  );
};

const getMediaIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon className='size-4' />;
  return <FileTextIcon className='size-4' />;
};
