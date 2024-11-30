import { cn } from '@/lib/utils';
import { Link, Outlet, useLocation } from 'react-router-dom';

const transactionLinks = [
  { title: 'Take Payment', url: '/transactions/take-payment' },
  { title: 'Payments', url: '/transactions/payments' },
  { title: 'Salaries', url: '/transactions/salaries' },
  { title: 'Expenses', url: '/transactions/expenses' },
];

const findPath = (url: string) => {
  if (url.includes('/take-payment')) return 'Take Payment';
  if (url.includes('/payments')) return 'Payments';
  if (url.includes('/salaries')) return 'Salaries';
  if (url.includes('/expenses')) return 'Expenses';
};

const isActive = (pathname: string, url: string) => {
  return pathname.includes(url);
};

export default function TransactionSubLayout() {
  const location = useLocation();
  return (
    <main className='flex'>
      <section className='h-[calc(100dvh-80px)] border-r py-6 pr-6'>
        <section>
          <h1 className='text-lg font-semibold'>
            Transactions {'>'} <span className='capitalize'>{findPath(location.pathname)}</span>
          </h1>
        </section>

        <div className='mt-4 flex flex-col'>
          {transactionLinks.map(({ title, url }) => (
            <Link
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 hover:bg-neutral-300 hover:text-black',
                isActive(location.pathname, `${url}`) && 'bg-primary text-white',
              )}
              key={url}
              to={url}
            >
              {title}
            </Link>
          ))}
        </div>
      </section>
      <section className='flex-grow pl-6'>
        <Outlet />
      </section>
    </main>
  );
}
