import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link className='text-2xl font-bold text-green-600' to={'/'}>
      MySch<span className='text-red-600'>oo</span>l
    </Link>
  );
};
