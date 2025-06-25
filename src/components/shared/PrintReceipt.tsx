import moment from 'moment';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { AppLogo, TooltipContainer } from '@/components/shared';
import { PrinterIcon } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { dateFormatString, months } from '@/data';
import { TGetPaymentResult } from '@/api/query';

type TPrintReceiptProps = { payment: TGetPaymentResult[number] };
export const PrintReceipt = ({ payment }: TPrintReceiptProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef, documentTitle: `Receipt-${payment.id}` });

  return (
    <>
      <TooltipContainer label='Print Receipt'>
        <Button onClick={handlePrint} variant='outline' size='icon'>
          <PrinterIcon className='size-4' />
        </Button>
      </TooltipContainer>

      <div style={{ display: 'none' }}>
        <div ref={printRef} className='print:m-8 print:bg-white print:p-8 print:text-black'>
          <ReceiptContent {...payment} />
        </div>
      </div>
    </>
  );
};

const ReceiptContent = ({
  id,
  amount,
  studentId,
  studentName,
  studentClass,
  studentClassroomName,
  description,
  year,
  month,
  createdAt,
  type,
}: TGetPaymentResult[number]) => {
  return (
    <div className='mx-auto max-w-md rounded-md border border-gray-300 font-sans text-sm leading-relaxed text-black shadow-md print:border print:shadow-none'>
      {/* Header */}
      <div className='mb-6 border-b border-gray-200 p-6 text-center'>
        <AppLogo />
        <h1 className='text-2xl font-bold tracking-wide text-gray-800'>Payment Receipt</h1>
        <p className='mt-2 text-xs text-gray-500'>{id}</p>
      </div>

      {/* Receipt details */}
      <div className=''>
        <ReceiptRow label='Name' value={studentName} />
        <ReceiptRow label='Id' value={`#${studentId}`} />
        <ReceiptRow label='Class' value={`${studentClassroomName} (${studentClass})`} />
        <ReceiptRow label='Payment Type' value={type.replace(/_/g, ' ')} />
        <ReceiptRow label='Amount' value={`$${amount}`} />
        <ReceiptRow label='Month / Year' value={`${month ? months[month] : ''} ${year}`} />
        {description && <ReceiptRow label='Description' value={description} />}
        <ReceiptRow label='Paid At' value={moment(createdAt).format(dateFormatString.basic)} />
      </div>

      {/* Footer */}
      <div className='mt-10 border-t border-gray-200 p-6 pt-4 text-center text-xs text-gray-500'>
        <p>Thank you for your payment!</p>
      </div>
    </div>
  );
};

const ReceiptRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className='flex justify-between px-6 pb-1 last:border-b-0'>
    <span className='font-semibold text-gray-600'>{label} : </span>
    <span className='font-medium text-gray-800'>{value}</span>
  </div>
);
