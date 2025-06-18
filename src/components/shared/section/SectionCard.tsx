import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGraduationCap, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';

type TSectionCardProps = {
  id: string;
  name: string;
  classTeacher?: { id: string; name: string };
  students: { id: string }[];
  linkPrefix: string;
  isClassTeacher?: boolean;
  class?: { level: string };
};

export const SectionCard = ({
  id,
  name,
  classTeacher,
  students,
  linkPrefix,
  isClassTeacher,
  class: cls,
}: TSectionCardProps) => (
  <Link to={`${linkPrefix}/${id}`} data-teacher={isClassTeacher ?? undefined}>
    <Card
      data-teacher={isClassTeacher ?? undefined}
      className='border-primary-100 bg-transparent data-[teacher]:bg-primary-50'
    >
      <CardHeader className='flex-row items-center justify-between gap-2 px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>
          {name} {cls && `(${cls.level})`}
        </CardTitle>
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
