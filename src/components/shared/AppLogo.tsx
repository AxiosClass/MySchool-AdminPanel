import { Link } from 'react-router-dom';

export function AppLogo() {
  return (
    <Link className='mt-6 h-24 text-2xl font-bold text-green-600' to={'/'}>
      <img className='mx-auto h-full w-[110px] md:w-[150px]' src='/logo.png' alt='Logo' />
    </Link>
  );
}
