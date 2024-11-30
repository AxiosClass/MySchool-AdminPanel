import BarLoader from 'react-spinners/BarLoader';
import { green } from 'tailwindcss/colors';

export function MainLayoutLoader() {
  return (
    <div className='flex h-dvh flex-col items-center justify-center gap-2 bg-primary-50'>
      <BarLoader color={green[400]} className='min-w-48' />
      <h1>Getting Things ready....</h1>
    </div>
  );
}
