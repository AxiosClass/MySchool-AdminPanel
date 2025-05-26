import moment from 'moment';
import { CalendarIcon, UserIcon, FileTextIcon, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { dateFormatString } from '@/data';
import { TGetNotesQueryResult } from '@/api/query';

type TNoteCardProps = {
  note: TGetNotesQueryResult[number];
  userId?: string;
  onEdit?: (noteId: string) => void;
  onRemove?: (noteId: string) => void;
};

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
  const formattedDate = moment(note.createdAt).format(dateFormatString.basic);

  return (
    <CardHeader className='pb-3'>
      <div className='flex items-start justify-between'>
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
          <Badge variant='outline' className='flex items-center space-x-1'>
            {getMediaIcon(note.media[0].type)}
            <span>{note.media.length}</span>
          </Badge>
        )}
      </div>
    </CardHeader>
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
          className='h-40 w-full rounded-lg border border-gray-200 object-cover transition-colors group-hover:border-gray-300'
        />
      ) : (
        <div className='flex h-32 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 transition-colors group-hover:bg-gray-100'>
          <FileTextIcon className='h-8 w-8 text-gray-400' />
        </div>
      )}
      <div className='absolute right-2 top-2 rounded-full bg-white/90 p-1 backdrop-blur-sm'>
        {getMediaIcon(media.type)}
      </div>
    </div>
  );
};

const getMediaIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon className='h-4 w-4' />;
  return <FileTextIcon className='h-4 w-4' />;
};
