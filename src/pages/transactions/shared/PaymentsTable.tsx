import moment from 'moment';

import { cn } from '@/lib/utils';
import { UserIcon } from '@/components/shared/UserIcon';
import { CommonTable } from '@/components/shared/CommonTable';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { dateFormatString, months } from '@/data/constants';
import { TGetPaymentResponse } from '@/api/query';
import { PAYMENT_TYPE } from '@/types';

export const PaymentsTable = ({ payments, className }: TPaymentsTableProps) => {
  return (
    <CommonTable
      className={{ tableContainer: className?.table }}
      head={
        <>
          <TableHead>StudentInfo</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className='text-center'>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Month / Year</TableHead>
          <TableHead className='text-right'>Paid at</TableHead>
        </>
      }
    >
      {payments.map(({ id, student, type, description, amount, month, year, createdAt }) => {
        const paymentConfig = PAYMENT_TYPE_CONFIG[type];
        return (
          <TableRow className='border-b' key={id}>
            <TableCell>
              <div className='flex gap-4'>
                <UserIcon username={student.name} />
                <div>
                  <h2 className='text-base font-semibold'>{student.name}</h2>
                  <p className='text-muted-foreground'>ID : {student.id} </p>
                </div>
              </div>
            </TableCell>
            <TableCell className='font-semibold'>
              {student.classroom.name} ({student.class})
            </TableCell>
            <TableCell className='font-semibold'>{amount} TK</TableCell>
            <TableCell className='text-center'>
              <span className={cn('rounded p-1 text-xs font-semibold text-white', paymentConfig.className)}>
                {type}
              </span>
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
    </CommonTable>
  );
};

// config
const PAYMENT_TYPE_CONFIG = {
  [PAYMENT_TYPE.ADMISSION_FEE]: { className: 'bg-orange-600' },
  [PAYMENT_TYPE.MONTHLY_FEE]: { className: 'bg-blue-600' },
  [PAYMENT_TYPE.OTHERS]: { className: 'bg-green-600' },
};

// types
type TPaymentsTableProps = { payments: TGetPaymentResponse[]; className?: { table?: string } };
