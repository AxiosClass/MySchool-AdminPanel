import { QK } from '@/api';
import { getMyNotices } from '@/api/query';
import { CardsLoader } from '@/components/loader';
import { useAuthStore } from '@/stores/auth';
import { useQuery } from '@tanstack/react-query';
import { Message } from '../Message';
import { NoticeCard } from './NoticeCard';

export const NoticeList = () => {
  const user = useAuthStore((state) => state.user);

  const { data: notices, isLoading } = useQuery({
    queryKey: [QK.NOTICE, 'MINE', { id: user?.id }],
    queryFn: getMyNotices,
    select: (res) => res.data,
    enabled: !!user?.id,
  });

  if (isLoading) return <CardsLoader size={3} />;
  if (!notices?.length) return <Message message='No Notices Found!' className='mt-6' />;

  return (
    <div className='grid gap-4 px-6 md:grid-cols-2 lg:grid-cols-3'>
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
};
