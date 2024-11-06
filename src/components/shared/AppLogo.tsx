import { Link } from 'react-router-dom';

export function AppLogo() {
  return (
    <Link className='text-2xl font-bold text-green-600' to={'/'}>
      <img className='w-[110px] md:w-[150px]' src='/logo.png' alt='' />
    </Link>
  );
}
