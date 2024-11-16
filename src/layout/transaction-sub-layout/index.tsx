import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export function TransactionSubLayout() {
  const location = useLocation();
  const subPageName = useMemo(() => {
    switch (location.pathname) {
      case '/transactions/payments':
        return 'Payments';
      case '/transactions/salaries':
        return 'Salaries';
      case '/transactions/expenses':
        return 'Expenses';

      default:
        return '';
    }
  }, [location.pathname]);

  const links = useMemo(() => {
    const isActive = (path: string) => location.pathname === path;

    return [
      {
        label: 'Payments',
        url: '/transactions/payments',
        isActive: isActive('/transactions/payments'),
      },

      {
        label: 'Salaries',
        url: '/transactions/salaries',
        isActive: isActive('/transactions/salaries'),
      },
      {
        label: 'Expenses',
        url: '/transactions/expenses',
        isActive: isActive('/transactions/expenses'),
      },
    ];
  }, [location.pathname]);

  return (
    <main className='flex gap-2'>
      <section className='h-[calc(100dvh-80px)] border-r border-primary-100 pr-4 pt-6'>
        <div className='flex w-52 items-center text-lg font-semibold capitalize'>
          Transaction {'>'} {subPageName}
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          {links.map(({ url, label, isActive }) => (
            <Link
              className={cn(
                'rounded-full px-4 py-2',
                isActive && 'bg-primary text-white',
              )}
              to={url}
              key={url}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
      <section className='flex-1 pt-6'>
        <Outlet />
      </section>
    </main>
  );
}
