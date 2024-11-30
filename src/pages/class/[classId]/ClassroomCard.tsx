import { FaUserTie } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa6';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IProps {
  id: string;
  name: string;
  classTeacher: { id: string; name: string };
  students: { id: string }[];
}

export function ClassroomCard({ name, classTeacher, students }: IProps) {
  return (
    <Card className='border-primary-100 bg-transparent'>
      <CardHeader className='px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>{name}</CardTitle>
      </CardHeader>
      <CardContent className='mt-2'>
        <div className='flex items-center gap-3'>
          <FaUserTie size={18} /> <p className='font-semibold'>{classTeacher.name}</p>
        </div>
        <div className='mt-2 flex items-center gap-3'>
          <FaGraduationCap size={20} /> <p className='font-semibold'> Total Students : {students.length}</p>
        </div>
      </CardContent>
    </Card>
  );
}
