import { Link } from 'react-router-dom';
import { FaUserGraduate } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TGetClassResponse } from '@/api/query';

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
  return (
    <Link to={`/class/${id}`}>
      <Card className='border-primary-100 hover:shadow-lg'>
        <CardHeader className='flex flex-row items-start justify-between'>
          <div className='space-y-1'>
            <CardTitle className='text-lg font-semibold'>Class: {name}</CardTitle>
            <span className='text-sm text-muted-foreground'>Level: {level}</span>
          </div>
          <div className='mt-4 flex gap-2'>
            <Link to={`/class/${id}/edit`} className='w-full'>
              <Button variant='outline' className='w-full'>
                Edit
              </Button>
            </Link>
            <DeleteButton classId={id} disabled={totalClassroom > 0} />
          </div>
        </CardHeader>

        <CardContent className='space-y-3 text-sm text-muted-foreground'>
          <InfoItem icon={<FaUserGraduate />} label='Students' value={totalStudent} />
          <InfoItem icon={<FaBuilding />} label='Sections' value={totalClassroom} />
          <InfoItem label='Admission Fee' value={admissionFee} />
          <InfoItem label='Monthly Fee' value={monthlyFee} />
          <InfoItem label='Term Fee' value={termFee} />
        </CardContent>
      </Card>
    </Link>
  );
};

// Reusable info row
const InfoItem = ({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string | number }) => (
  <div className='flex items-center gap-2'>
    {icon && <span className='text-muted-foreground'>{icon}</span>}
    <span className='font-medium'>{label}:</span>
    <span className='ml-auto text-right font-medium'>{value}</span>
  </div>
);

// Delete button with logic
const DeleteButton = ({ classId, disabled }: { classId: string; disabled: boolean }) => {
  const handleDelete = () => {
    if (!disabled) {
      // Confirm and call delete logic here
      console.log('Delete class with id:', classId);
    }
  };

  return (
    <Button variant='destructive' onClick={handleDelete} className='w-full' disabled={disabled}>
      Delete
    </Button>
  );
};
