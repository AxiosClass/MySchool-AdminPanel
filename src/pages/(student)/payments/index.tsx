import moment from 'moment';

import { cn } from '@/lib/utils';
import { dateFormatString, months } from '@/data';
import { CommonTable, Message, PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useGetStudentPayments } from '@/hooks';
import { useAuthStore } from '@/stores/auth';
import { PAYMENT_TYPE } from '@/types';

export default function StudentPaymentPage() {
  return (
    <>
      <PageTitle title='Payments' />
      <ScrollArea>
        <Payments />
      </ScrollArea>
    </>
  );
}

const Payments = () => {
  return (
    <CommonTable
      head={
        <>
          <TableHead>SL</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className='text-center'>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Month / Year</TableHead>
          <TableHead className='text-right'>Paid At</TableHead>
        </>
      }
      className={{ tableContainer: 'p-6' }}
    >
      <PaymentTableBody />
    </CommonTable>
  );
};

const PAYMENT_TYPE_CONFIG = {
  [PAYMENT_TYPE.ADMISSION_FEE]: { className: 'bg-orange-600' },
  [PAYMENT_TYPE.MONTHLY_FEE]: { className: 'bg-blue-600' },
  [PAYMENT_TYPE.OTHERS]: { className: 'bg-green-600' },
};

const PaymentTableBody = () => {
  const user = useAuthStore((state) => state.user);
  const { data: payments, isLoading } = useGetStudentPayments(user?.id as string);

  if (isLoading) return <PaymentTableLoader />;
  if (!payments?.length) return <NoPaymentFound />;

  return (
    <>
      {payments.map(({ id, amount, type, description, month, year, createdAt }, index) => {
        const config = PAYMENT_TYPE_CONFIG[type];

        return (
          <TableRow key={id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{amount} TK</TableCell>
            <TableCell className='text-center'>
              <span className={cn('rounded p-1 text-xs font-semibold text-white', config.className)}>{type}</span>
            </TableCell>
            <TableCell className='text-muted-foreground'>{description + 'TK' || 'N/A'} </TableCell>
            <TableCell className='font-semibold text-muted-foreground'>
              {month && `${months[month]}, `}
              {year}
            </TableCell>
            <TableCell className='text-right text-muted-foreground'>
              {moment(createdAt).format(dateFormatString.basic)}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

const PaymentTableLoader = () => (
  <>
    {Array.from({ length: 4 }).map((_, index) => (
      <TableRow key={index}>
        {Array.from({ length: 6 }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton className='h-10' />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

const NoPaymentFound = () => (
  <tr>
    <td colSpan={6}>
      <Message className='py-6' message='No Payment Found!' />
    </td>
  </tr>
);
