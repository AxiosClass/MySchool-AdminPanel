import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IClassInfo } from '@/data-fetching/queries/getClasses';
import { Link } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa6';
import { FaBuilding } from 'react-icons/fa';

export function ClassCard({ name, level, id, classrooms }: IClassInfo) {
  const totalStudents = classrooms.reduce((count, classroom) => {
    count += classroom.students?.length || 0;
    return count;
  }, 0);

  return (
    <Link to={`/class/${id}`}>
      <Card className='border-primary-100 bg-transparent'>
        <CardHeader className='flex flex-row items-center gap-6'>
          <CardTitle className='text-xl'>Class : {name}</CardTitle>
          <span className='ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-white'>
            {level}
          </span>
        </CardHeader>
        <CardContent>
          <p className='flex items-center gap-2 font-semibold'>
            <FaUserGraduate className='size-4' /> Students : {totalStudents}
          </p>
          <p className='mt-2 flex items-center gap-2 font-semibold'>
            <FaBuilding className='size-4' />
            Sections: {classrooms?.length || 0}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
