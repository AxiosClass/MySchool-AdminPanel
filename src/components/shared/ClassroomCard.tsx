import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FaGraduationCap, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';

export const ClassroomCard = ({
  id,
  name,
  classTeacher,
  students,
  linkPrefix,
  isClassTeacher,
}: TClassroomCardProps) => (
  <Link to={`${linkPrefix}/${id}`} data-is_teacher={isClassTeacher ?? undefined}>
    <Card
      data-teacher={isClassTeacher ?? undefined}
      className='border-primary-100 bg-transparent data-[teacher]:bg-primary-50'
    >
      <CardHeader className='flex-row items-center justify-between gap-2 px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>{name}</CardTitle>
        {isClassTeacher && <FaChalkboardTeacher className='size-5' />}
      </CardHeader>
      <CardContent className='mt-2'>
        {classTeacher && (
          <div className='flex items-center gap-3'>
            <FaUserTie size={18} /> <p className='font-semibold'>{classTeacher?.name}</p>
          </div>
        )}

        <div className='mt-2 flex items-center gap-3'>
          <FaGraduationCap size={20} /> <p className='font-semibold'> Total Students : {students.length}</p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

type TClassroomCardProps = {
  id: string;
  name: string;
  classTeacher?: { id: string; name: string };
  students: { id: string }[];
  linkPrefix: string;
  isClassTeacher?: boolean;
};
