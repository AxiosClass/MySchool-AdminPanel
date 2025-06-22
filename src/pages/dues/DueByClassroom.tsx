import { QK } from '@/api';
import { cn } from '@/lib/utils';
import { getDuesByClassroom, TGetDuesByClassroom } from '@/api/query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardsLoader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { MdWallet } from 'react-icons/md';

export const DueByClassroom = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.DUE, 'BY_CLASSROOM'],
    queryFn: getDuesByClassroom,
    select: (res) => res.data,
  });

  if (isLoading) return <CardsLoader />;

  return (
    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {data?.classrooms.map((item) => <DueCard key={item.id} {...item} />)}
    </section>
  );
};

type TDueCardProps = TGetDuesByClassroom['classrooms'][number];
const DueCard = ({ classLevel, name, totalDue, totalPaid }: TDueCardProps) => {
  const due = totalDue || 0 - totalPaid || 0;
  const percentagePaid = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;
  const percentageDue = totalDue > 0 ? 100 - percentagePaid : 0;

  const progressColor =
    percentagePaid >= 75 ? 'bg-primary' : percentagePaid >= 50 ? 'bg-orange-500' : 'bg-destructive';

  const formattedPaidPercentage = formatNumber(percentagePaid);
  const formattedDuePercentage = formatNumber(percentageDue);

  return (
    <Card className='w-full border border-muted shadow-md'>
      <CardHeader className='p-6'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            {name} ({classLevel})
          </CardTitle>
          <div className='flex items-center gap-2 text-sm font-medium'>
            <MdWallet className='size-4' /> {due.toLocaleString()} TK
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <div className='rounded-full bg-gray-100'>
            <div style={{ width: `${percentagePaid}%` }} className={cn('h-2 rounded-full', progressColor)} />
          </div>
          <div className='flex justify-between text-xs text-muted-foreground'>
            <span>{formattedPaidPercentage}% Paid</span>
            <span>{formattedDuePercentage}% Due</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const formatNumber = (val: number) => (Number.isInteger(val) ? String(val) : val.toFixed(1));
