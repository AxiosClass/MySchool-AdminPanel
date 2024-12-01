import { useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaymentSummary } from './PaymentSummary';
import { useSearchParams } from 'react-router-dom';
import { Message } from '@/components/shared/Message';
import { PageTitle } from '@/components/shared/PageTitle';
import { useGetPaymentSummary } from '@/data-fetching/hooks/payment';
import { PaymentsTable } from './PaymentsTable';

export default function TakePaymentPage() {
  const [searchParams, setSearchParam] = useSearchParams();
  const studentId = searchParams.get('studentId');
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: paymentSummary, isLoading } = useGetPaymentSummary(studentId!);
  if (isLoading) return 'Payment summary is loading';

  return (
    <PageTitle title='Take Payment'>
      <section className='mt-6 flex w-full justify-center'>
        <div className='relative w-full max-w-96'>
          <Input
            ref={inputRef}
            className='rounded-md'
            placeholder='Input student id here...'
            onKeyDown={(event) => {
              if (event.key === 'Enter' && inputRef.current?.value)
                setSearchParam({ studentId: inputRef.current?.value || '' });
            }}
          />
          <Button
            onClick={() => setSearchParam({ studentId: inputRef.current?.value || '' })}
            className='absolute right-0 top-0 rounded-md'
          >
            <SearchIcon />
          </Button>
        </div>
      </section>
      {studentId ? (
        <>
          <PaymentSummary {...paymentSummary?.data!} />
          <PaymentsTable studentId={studentId} />
        </>
      ) : (
        <Message className='mt-12' message='Input student id first' />
      )}
    </PageTitle>
  );
}
