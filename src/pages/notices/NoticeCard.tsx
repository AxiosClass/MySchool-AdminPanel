import { Badge, badgeVariants } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NOTICE_FOR, TNotice } from '@/types';
import { format } from 'date-fns';

export const NoticeCard = ({ title, description, noticeFor, createdAt }: TNotice) => {
  const noticeForConfig = NOTICE_FOR_CONFIG[noticeFor];

  return (
    <Card className='bg-transparent'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='text-justify'>{description}</CardDescription>
        <div className='mt-2 flex items-center justify-between'>
          <p className='font-semibold text-muted-foreground'>{format(createdAt, 'PPP')}</p>
          <Badge variant={noticeForConfig.variant as keyof typeof badgeVariants}>{noticeFor}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// config
const NOTICE_FOR_CONFIG = {
  [NOTICE_FOR.ALL]: { variant: 'default' },
  [NOTICE_FOR.STUDENT]: { variant: 'secondary' },
  [NOTICE_FOR.TEACHER]: { variant: 'destructive' },
};

// types
