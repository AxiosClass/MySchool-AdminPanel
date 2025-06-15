import { useNavigate } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TGetClassResponse } from '@/api/query';
import { UpdateClass } from './UpdateClass';
import { ReactNode } from 'react';

type ClassCardProps = TGetClassResponse[number];

export const ClassCard = ({
  id,
  name,
  level,
  totalStudent,
  totalClassroom,
  admissionFee,
  monthlyFee,
  termFee,
}: ClassCardProps) => {
  const navigate = useNavigate();
  const navigateToClassDetailsPage = () => navigate(`/class/${id}`);

  return (
    <Card className='cursor-pointer border-primary-100 hover:shadow-lg' onClick={navigateToClassDetailsPage}>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div className='space-y-1'>
          <CardTitle className='text-lg font-semibold'>Class: {name}</CardTitle>
          <span className='text-sm text-muted-foreground'>Level: {level}</span>
        </div>
        <div className='mt-4 flex gap-2' onClick={(e) => e.stopPropagation()}>
          <UpdateClass
            id={id}
            name={name}
            level={level}
            admissionFee={admissionFee}
            monthlyFee={monthlyFee}
            termFee={termFee}
          />
        </div>
      </CardHeader>

      <CardContent className='space-y-3'>
        <InfoItem icon={<FaUserGraduate />} label='Students' value={totalStudent} />
        <InfoItem icon={<FaBuilding />} label='Sections' value={totalClassroom} />
        <InfoItem label='Admission Fee' value={admissionFee} />
        <InfoItem label='Monthly Fee' value={monthlyFee} />
        <InfoItem label='Term Fee' value={termFee} />
      </CardContent>
    </Card>
  );
};

type TInfoItemProps = { icon?: ReactNode; label: string; value: string | number };

const InfoItem = ({ icon, label, value }: TInfoItemProps) => (
  <div className='flex items-center gap-2'>
    {icon && <span className='text-muted-foreground'>{icon}</span>}
    <span className='font-medium'>{label}:</span>
    <span className='ml-auto text-right font-medium'>{value}</span>
  </div>
);
