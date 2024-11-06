import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { IClass } from '@/lib/types';

export function ClassCard({ name, level, id }: IClass) {
  return (
    <Link to={`/class/${id}`}>
      <Card className='border-primary-100 bg-transparent'>
        <CardHeader className='flex flex-row items-center gap-6'>
          <CardTitle className='text-xl'>Class : {name}</CardTitle>
          <span className='ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-white'>
            {level}
          </span>
        </CardHeader>
      </Card>
    </Link>
  );
}
