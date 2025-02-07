import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchIcon } from 'lucide-react';
import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaymentSummary } from './PaymentSummary';

export default function TakePaymentPage() {
  const [searchParams, setSearchParam] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const studentId = searchParams.get('studentId');

  return (
    <ScrollArea>
      <PageTitle title='Take Payment' />
      <div className='relative mx-auto my-6 w-full max-w-96'>
        <Input
          ref={inputRef}
          className='rounded-md'
          placeholder='Input student id here...'
          defaultValue={studentId || ''}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputRef.current?.value)
              setSearchParam({ studentId: inputRef.current?.value || '' });
          }}
        />
        <Button
          className='absolute right-0 top-1/2 -translate-y-1/2'
          onClick={() => setSearchParam({ studentId: inputRef.current?.value || '' })}
        >
          <SearchIcon />
        </Button>
      </div>
      <PaymentSummary studentId={studentId!} />
    </ScrollArea>
  );

  // return (
  //   <PageTitle title='Take Payment'>
  //     <section className='mt-6 flex w-full justify-center'>
  //       <div className='relative w-full max-w-96'>
  //         <Input
  //           ref={inputRef}
  //           className='rounded-md'
  //           placeholder='Input student id here...'
  //           onKeyDown={(event) => {
  //             if (event.key === 'Enter' && inputRef.current?.value)
  //               setSearchParam({ studentId: inputRef.current?.value || '' });
  //           }}
  //         />
  //         <Button
  //           onClick={() => setSearchParam({ studentId: inputRef.current?.value || '' })}
  //           className='absolute right-0 top-0 rounded-md'
  //         >
  //           <SearchIcon />
  //         </Button>
  //       </div>
  //     </section>
  //     {studentId ? (
  //       <>
  //         <PaymentSummary {...paymentSummary?.data!} />
  //         <Payments studentId={studentId} />
  //       </>
  //     ) : (
  //       <Message className='mt-12' message='Input student id first' />
  //     )}
  //   </PageTitle>
  // );
}
