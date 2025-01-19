import BarLoader from 'react-spinners/BarLoader';
import { green } from 'tailwindcss/colors';

export const TransactionSubLayoutLoader = () => {
  return (
    <div className='flex h-[calc(100dvh-80px)] flex-col items-center justify-center gap-2'>
      <BarLoader color={green[400]} className='min-w-48' />
      <h1>Getting Transactions ready....</h1>
    </div>
  );
};
