import { Message } from '@/components/shared/Message';
import { IPaymentSummary } from '@/data-fetching/hooks/payment';
import { MakePayment } from '@/components/shared/make-payment/MakePayment';

export function PaymentSummary(paymentSummary: IPaymentSummary) {
  if (!paymentSummary?.id) return <Message className='mt-12' message='No Student Found' />;

  const { name, class: classLevel, classroom, totalPaid, totalDue, id } = paymentSummary;

  return (
    <section className='mt-12'>
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

          <div className='flex items-center gap-4'></div>
        </div>
        <div className='ml-auto'>
          <MakePayment studentId={id} />
        </div>
      </section>
    </section>
  );
}
