import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaGraduationCap, FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';
import { UpdateSection } from './UpdateSection';

type TSectionCardProps = {
  id: string;
  name: string;
  classTeacher?: { id: string; name: string };
  students: { id: string }[];
  linkPrefix: string;
  isClassTeacher?: boolean;
  class?: { level: string };
  canModify?: boolean;
};

export const SectionCard = ({
  id,
  name,
  classTeacher,
  students,
  linkPrefix,
  isClassTeacher,
  class: cls,
  canModify,
}: TSectionCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      data-teacher={isClassTeacher ?? undefined}
      className='border-primary-100 bg-transparent data-[teacher]:bg-primary-50'
      onClick={() => navigate(`${linkPrefix}/${id}`)}
    >
      <CardHeader className='flex-row items-center justify-between gap-2 px-4 pb-2 pt-4'>
        <CardTitle className='text-xl'>
          {name} {cls && `(${cls.level})`}
        </CardTitle>
        {isClassTeacher && <FaChalkboardTeacher className='size-5' />}

        {canModify && (
          <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-4'>
            <UpdateSection
              name={name}
              classLevel={cls?.level || ''}
              sectionId={id}
              teacherId={classTeacher?.id || ''}
            />
          </div>
        )}
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
  );
};
