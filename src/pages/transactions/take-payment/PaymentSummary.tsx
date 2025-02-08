import { QK } from '@/api';
import { getPaymentSummary } from '@/api/query';
import { MakePayment, Message } from '@/components/shared';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { Payments } from './Payments';

export const PaymentSummary = ({ studentId }: { studentId: string }) => {
  const { data: paymentSummary, isLoading } = useQuery({
    queryKey: [QK.PAYMENT, 'SUMMARY', { studentId }],
    queryFn: () => getPaymentSummary(studentId),
    enabled: !!studentId,
    select: (res) => res.data,
  });

  if (isLoading) return <PaymentSummaryLoader />;
  if (!paymentSummary) return <Message className='my-12' message='No Student Found' />;

  const { name, class: classLevel, classroom, totalPaid, totalDue } = paymentSummary;

  return (
    <>
      <div className='h-64 w-full rounded-t-xl bg-gradient-to-br from-green-300 to-green-700' />
      <section className='flex items-end gap-12 rounded-b-md bg-white p-6 shadow'>
        <div className='-mt-24 flex size-40 items-center justify-center rounded-full bg-primary text-8xl font-bold text-white'>
          {name[0]}
        </div>
        <div>
          <h1 className='text-xl font-bold'>{name}</h1>
          <div className='mt-1 grid grid-cols-2 items-center'>
            <p className='text-muted-foreground'>
              Class : <span className='font-semibold'>{classLevel}</span>
            </p>
            <p className='text-muted-foreground'>
              Section : <span className='font-semibold'>{classroom.name}</span>
            </p>
            <p className='font-semibold'>Paid : {totalPaid}</p>
            <p className='font-semibold'>Due : {(totalDue || 0) - (totalPaid || 0)}</p>
          </div>
        </div>
        <div className='ml-auto'>
          <MakePayment studentId={studentId} />
        </div>
      </section>
      <Payments key={studentId} studentId={studentId} />
    </>
  );
};

const PaymentSummaryLoader = () => {
  return (
    <div>
      <Skeleton className='h-64 w-full animate-pulse rounded-t-xl bg-gradient-to-br from-green-300 to-green-700' />
      <section className='flex items-end gap-12 rounded-b-md bg-white p-6 shadow'>
        <div className='-mt-24 flex size-40 animate-pulse items-center justify-center rounded-full bg-primary'>
          <Skeleton className='h-20 w-20 rounded-full' />
        </div>
        <div>
          <Skeleton className='mb-2 h-8 w-48 animate-pulse' />
          <div className='mt-1 grid grid-cols-2 items-center gap-x-10 gap-y-2'>
            <Skeleton className='h-6 w-32 animate-pulse' />
            <Skeleton className='h-6 w-32 animate-pulse' />
            <Skeleton className='h-6 w-24 animate-pulse' />
            <Skeleton className='h-6 w-24 animate-pulse' />
          </div>
        </div>
        <div className='ml-auto'>
          <Skeleton className='h-10 w-32 animate-pulse' />
        </div>
      </section>
    </div>
  );
};
