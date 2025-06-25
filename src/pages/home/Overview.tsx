import { QK } from '@/api';
import { getOverview } from '@/api/query';
import { CardsLoader } from '@/components/loader';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { AlertCircleIcon, BookOpenIcon, DollarSignIcon, UsersIcon } from 'lucide-react';
import { ReactNode } from 'react';

export const Overview = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW],
    queryFn: getOverview,
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader cardContainerClassName='px-0' />;

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <OverviewCard icon={<UsersIcon />} label='Students' value={data?.totalStudent ?? 0} />
      <OverviewCard icon={<BookOpenIcon />} label='Teachers' value={data?.totalTeacher ?? 0} />
      <OverviewCard icon={<DollarSignIcon />} label='Collected' value={data?.collection ?? 0} />
      <OverviewCard icon={<AlertCircleIcon />} label='Dues' value={data?.currentDue ?? 0} />
    </div>
  );
};

type TOverviewCardProps = { icon: ReactNode; label: string; value: number };
const OverviewCard = ({ icon, label, value }: TOverviewCardProps) => (
  <Card>
    <CardContent className='flex items-center gap-4 p-4'>
      <div className='flex size-12 items-center justify-center rounded-full bg-muted text-primary'>
        {icon}
      </div>
      <div className='space-y-1'>
        <p className='text-lg font-semibold'>{label}</p>
        <p className='text-2xl font-bold'>{value}</p>
      </div>
    </CardContent>
  </Card>
);
