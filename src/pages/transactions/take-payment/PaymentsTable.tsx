import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { months } from '@/data/constants';
import { PAYMENT_TYPES } from '@/types/common';
import { TableCell, TableHead, TableRow } from '@/components/ui/table';
import { CustomTable } from '@/components/shared/CustomTable';
import { Message } from '@/components/shared/Message';
import { UserIcon } from '@/components/shared/UserIcon';
import { useGetPaymentsQuery } from '@/data-fetching/hooks/payment';

export function PaymentsTable({ studentId }: { studentId: string }) {
  const { data: paymentsData, isLoading } = useGetPaymentsQuery({ studentId });

  if (isLoading) return 'Payments is loading';

  console.log(paymentsData);

  return (
    <>
      {paymentsData?.data && paymentsData.data.length > 0 ? (
        <CustomTable
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
          {paymentsData.data.map(({ id, amount, createdAt, description, month, student, type, year }) => (
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
                <span
                  className={cn(
                    'rounded p-1 text-xs font-semibold text-white',
                    type === PAYMENT_TYPES.ADMISSION_FEE && 'bg-orange-600',
                    type === PAYMENT_TYPES.MONTHLY_FEE && 'bg-green-600',
                    type === PAYMENT_TYPES.OTHERS && 'bg-blue-600',
                  )}
                >
                  {type}
                </span>
              </TableCell>
              <TableCell className='text-muted-foreground'>{description || 'N/A'} TK</TableCell>
              <TableCell className='font-semibold text-muted-foreground'>
                {month && `${months[month]}, `}
                {year}
              </TableCell>
              <TableCell className='text-right text-muted-foreground'>{format(createdAt, 'PPP')}</TableCell>
            </TableRow>
          ))}
        </CustomTable>
      ) : (
        <Message className='mt-12' message='No payments found' />
      )}
    </>
  );
}
