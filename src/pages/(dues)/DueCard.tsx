import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MdWallet } from 'react-icons/md';
import { Link } from 'react-router-dom';

type TDueCardProps = {
  id: string;
  title: string;
  totalDue: number;
  totalPaid: number;
  totalDiscount: number;
  linkPrefix: string;
};

export const DueCard = ({ id, title, totalDue, totalPaid, totalDiscount, linkPrefix }: TDueCardProps) => {
  const due = (totalDue || 0) - (totalPaid || 0) - (totalDiscount || 0);
  const percentagePaid = totalDue > 0 ? (totalPaid / totalDue) * 100 : 0;
  const percentageDue = totalDue > 0 ? 100 - percentagePaid : 0;

  const progressColor =
    percentagePaid >= 75 ? 'bg-primary' : percentagePaid >= 50 ? 'bg-orange-500' : 'bg-destructive';

  const formattedPaidPercentage = formatNumber(percentagePaid);
  const formattedDuePercentage = formatNumber(percentageDue);

  return (
    <Link to={`${linkPrefix}/${id}`}>
      <Card className='w-full border border-muted shadow-md'>
        <CardHeader className='p-6'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
            <div className='flex items-center gap-2 text-sm font-medium'>
              <MdWallet className='size-4' /> {due.toLocaleString()} TK
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <div className='rounded-full bg-gray-100'>
              <div
                style={{ width: `${percentagePaid}%` }}
                className={cn('h-2 rounded-full', progressColor)}
              />
            </div>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>{formattedPaidPercentage}% Paid</span>
              <span>{formattedDuePercentage}% Due</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const formatNumber = (val: number) => (Number.isInteger(val) ? String(val) : val.toFixed(1));
