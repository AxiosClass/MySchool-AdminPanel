import { cn } from '@/lib/utils';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const TransactionSubLayout = () => {
  const location = useLocation();
  return (
    <div className='flex h-full w-full'>
      <div className='min-w-[290px] border-r p-6'>
        <h1 className='text-lg font-semibold'>
          Transactions {'>'} <span className='capitalize'>{findPath(location.pathname)}</span>
        </h1>

        <div className='mt-4 flex flex-col gap-1'>
          {transactionLinks.map(({ title, url }) => (
            <Link
              className={cn(
                'flex items-center gap-2 rounded-md px-4 py-2 hover:bg-neutral-300 hover:text-black',
                isActive(location.pathname, `${url}`) && 'bg-primary text-white',
              )}
              key={url}
              to={url}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
      <section className='flex-grow p-6'>
        <Outlet />
      </section>
    </div>
  );
};

// configs
const transactionLinks = [
  { title: 'Take Payment', url: '/transactions/take-payment' },
  { title: 'Payments', url: '/transactions/payments' },
];

const findPath = (url: string) => {
  if (url.includes('/take-payment')) return 'Take Payment';
  if (url.includes('/payments')) return 'Payments';
};

const isActive = (pathname: string, url: string) => {
  return pathname.includes(url);
};
