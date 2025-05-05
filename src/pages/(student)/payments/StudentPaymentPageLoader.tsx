import { TableLoader } from '@/components/loader';
import { Skeleton } from '@/components/ui/skeleton';

export const StudentPaymentPageLoader = () => (
  <>
    <PaymentSummaryLoader />
    <TableLoader className='p-6' />;
  </>
);

export const PaymentSummaryLoader = () => (
  <div className='grid grid-cols-3 gap-6 p-6'>
    {Array.from({ length: 3 }).map((_, index) => (
      <Skeleton key={index} className='h-32 w-full' />
    ))}
  </div>
);
