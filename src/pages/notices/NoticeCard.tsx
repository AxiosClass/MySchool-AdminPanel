import moment from 'moment';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NOTICE_FOR, TNotice } from '@/types';
import { DeleteNotice } from './DeleteNotice';
import { UpdateNotice } from './UpdateNotice';
import { dateFormatString } from '@/data';

export const NoticeCard = (props: TNotice) => {
  const { title, description, noticeFor, createdAt } = props;
  const noticeForConfig = NOTICE_FOR_CONFIG[noticeFor];

  return (
    <Card className='bg-transparent'>
      <CardHeader className='flex flex-row items-center gap-2'>
        <CardTitle className='mr-auto'>{title}</CardTitle>
        <DeleteNotice noticeId={props.id} />
        <UpdateNotice {...props} />
      </CardHeader>
      <CardContent>
        <CardDescription className='text-justify'>{description}</CardDescription>
        <div className='mt-2 flex items-center justify-between'>
          <p className='font-semibold text-muted-foreground'>{moment(createdAt).format(dateFormatString.basic)}</p>
          <Badge className={cn(noticeForConfig.classname)}>{noticeFor}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// config
const NOTICE_FOR_CONFIG = {
  [NOTICE_FOR.ALL]: { classname: 'bg-primary' },
  [NOTICE_FOR.STUDENT]: { classname: 'bg-orange-600' },
  [NOTICE_FOR.TEACHER]: { classname: 'bg-emerald-600' },
};
