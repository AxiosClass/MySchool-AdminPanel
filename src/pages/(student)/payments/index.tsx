import moment from 'moment';

import { cn } from '@/lib/utils';
import { dateFormatString, months } from '@/data';
import { CommonTable, PageTitle, TableNoData } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { useGetPaymentSummary, useGetStudentPayments } from '@/hooks';
import { FiDollarSign } from 'react-icons/fi';
import { useAuthStore } from '@/stores/auth';
import { PAYMENT_TYPE } from '@/lib/types';
import { PaymentSummaryLoader } from './StudentPaymentPageLoader';
import { TableBodyLoader } from '@/components/loader';

export default function StudentPaymentPage() {
  return (
    <>
      <PageTitle title='Payments' />
      <ScrollArea>
        <PaymentSummary />
        <PaymentTable />
      </ScrollArea>
    </>
  );
}

const PaymentSummary = () => {
  const user = useAuthStore((state) => state.user);
  const { data: payments, isLoading } = useGetPaymentSummary(user?.id as string);

  if (isLoading) return <PaymentSummaryLoader />;

  return (
    <div className='grid grid-cols-3 gap-6 p-6'>
      <PaymentCard label='Demand' value={(payments?.totalPaid || 0) + (payments?.totalDue || 0)} />
      <PaymentCard label='Paid' value={payments?.totalPaid || 0} />
      <PaymentCard label='Due' value={payments?.totalDue || 0} />
    </div>
  );
};

const PaymentCard = ({ label, value }: { label: string; value: number }) => (
  <div className='rounded-lg border border-gray-200 bg-gray-50 p-6'>
    <h3 className='text-lg font-semibold'>{label}</h3>
    <div className='mt-2 flex items-center justify-between gap-2'>
      <h2 className='text-3xl font-bold'>{value}</h2>
      <FiDollarSign className='text-3xl' />
    </div>
  </div>
);

const PAYMENT_TYPE_CONFIG = {
  [PAYMENT_TYPE.ADMISSION_FEE]: { className: 'bg-orange-600' },
  [PAYMENT_TYPE.MONTHLY_FEE]: { className: 'bg-blue-600' },
  [PAYMENT_TYPE.TERM_FEE]: { className: 'bg-yellow-600' },
  [PAYMENT_TYPE.OTHERS]: { className: 'bg-green-600' },
};

const PaymentTable = () => (
  <CommonTable head={<PaymentTableHead />} tableContainerClassName='p-6'>
    <PaymentTableBody />
  </CommonTable>
);

const PaymentTableHead = () => (
  <>
    <TableHead>SL</TableHead>
    <TableHead>Amount</TableHead>
    <TableHead className='text-center'>Type</TableHead>
    <TableHead>Description</TableHead>
    <TableHead>Month / Year</TableHead>
    <TableHead className='text-right'>Paid At</TableHead>
  </>
);

const PaymentTableBody = () => {
  const user = useAuthStore((state) => state.user);
  const { data: payments, isLoading } = useGetStudentPayments(user?.id as string);

  if (isLoading) return <TableBodyLoader cols={6} />;
  if (!payments?.length) return <TableNoData colSpan={6} message='No payments found' />;

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
            <TableCell className='text-muted-foreground'>{description || 'N/A'} </TableCell>
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
