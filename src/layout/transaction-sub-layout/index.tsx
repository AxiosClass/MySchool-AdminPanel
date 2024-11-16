import { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export function TransactionSubLayout() {
  const location = useLocation();
  const subPageName = useMemo(() => {
    if (location.pathname === '/transactions/payments') return 'Payments';
  }, [location.pathname]);

  return (
    <main className='flex items-center gap-2'>
      <section className='h-[calc(100dvh-64px)] border-r border-primary-100 pr-4'>
        <div className='flex items-center text-lg font-semibold capitalize'>
          Transaction {'>'} {subPageName}
        </div>
      </section>
      <section className='flex-1'>
        <Outlet />
      </section>
    </main>
  );
}
