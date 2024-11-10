import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaUserTie } from 'react-icons/fa';
import { IStaff } from '@/lib/types';

interface IProps {
  id: string;
  name: string;
  classTeacher: Pick<IStaff, 'name' | 'id'>;
}

export function ClassroomCard({ name, classTeacher }: IProps) {
  return (
    <Card className='border-primary-100 bg-transparent'>
      <CardHeader className='px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-2'>
          <FaUserTie /> <p className='font-semibold'>{classTeacher.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
