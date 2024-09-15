import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link className='text-2xl font-bold text-green-600' to={'/'}>
      <img width={150} src='/public/logo.png' alt='' />
    </Link>
  );
};
