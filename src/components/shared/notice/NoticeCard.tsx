import moment from 'moment';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NOTICE_FOR, TNotice } from '@/lib/types';
import { DeleteNotice } from './DeleteNotice';
import { UpdateNotice } from './UpdateNotice';
import { dateFormatString } from '@/data';

type TNoticeCardProps = { notice: TNotice; updateNotice?: boolean; deleteNotice?: boolean; showNoticeFor?: boolean };

export const NoticeCard = ({ notice, deleteNotice, updateNotice, showNoticeFor }: TNoticeCardProps) => {
  const { id, title, description, noticeFor, createdAt } = notice;
  const noticeForConfig = NOTICE_FOR_CONFIG[noticeFor];

  return (
    <Card className='flex h-full flex-col bg-transparent'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <CardTitle className='mr-auto line-clamp-1 break-all uppercase'>{title}</CardTitle>

        {deleteNotice && <DeleteNotice noticeId={id} />}
        {updateNotice && <UpdateNotice {...notice} />}
      </CardHeader>

      <CardContent className=''>
        <CardDescription className='text-justify'>{description}</CardDescription>
      </CardContent>
      <CardFooter className='mt-auto flex items-center justify-between border-t border-gray-200 p-4'>
        <p className='font-semibold text-muted-foreground'>{moment(createdAt).format(dateFormatString.basic)}</p>
        {showNoticeFor && <Badge className={cn(noticeForConfig.classname)}>{noticeFor}</Badge>}
      </CardFooter>
    </Card>
  );
};

// config
const NOTICE_FOR_CONFIG = {
  [NOTICE_FOR.ALL]: { classname: 'bg-primary' },
  [NOTICE_FOR.STUDENT]: { classname: 'bg-orange-600' },
  [NOTICE_FOR.TEACHER]: { classname: 'bg-emerald-600' },
};
