import moment from 'moment';

import { TStudentInfo } from '@/api/query';
import { Card } from '@/components/ui/card';
import { dateFormatString } from '@/data';
import { getInitials } from '@/helpers';
import { cn } from '@/lib/utils';
import { DollarSignIcon, GraduationCapIcon } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
import { GiTeacher } from 'react-icons/gi';
import { FaCalendar } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import { FaFileWaveform } from 'react-icons/fa6';

type TStudentProfileProps = PropsWithChildren<TStudentInfo & { showPaymentInfo?: boolean }>;

export const StudentProfile = ({
  id,
  name,
  status,
  admittedAt,
  classroomName,
  classLevel,
  className,
  totalPaid,
  totalDiscount,
  totalDue,
  showPaymentInfo,
  children,
}: TStudentProfileProps) => {
  return (
    <Card className='overflow-hidden border-0 bg-white transition-all duration-500'>
      <div className='flex items-center gap-4 p-6'>
        <div className='flex size-20 items-center justify-center rounded-full bg-primary shadow-xl'>
          <span className={`text-2xl font-bold text-white`}>{getInitials(name)}</span>
        </div>
        <div className=''>
          <h2 className='mb-1 text-2xl font-bold'>{name}</h2>
          <p className='flex items-center text-muted-foreground'>
            <GraduationCapIcon className='mr-2 h-4 w-4' />
            Student ID: {id}
          </p>
        </div>
        {children}
      </div>
      <div className='mb-6 grid grid-cols-1 gap-4 px-6 md:grid-cols-2'>
        <InfoCardItem
          icon={<IoBook className='size-6' />}
          title='Class'
          value={`${className} (${classLevel})`}
          color='blue'
        />
        <InfoCardItem icon={<GiTeacher className='size-6' />} title='Section' value={classroomName} color='green' />
        <InfoCardItem
          icon={<FaCalendar className='size-6' />}
          title='Admitted Date'
          value={moment(admittedAt).format(dateFormatString.basic)}
          color='purple'
        />
        <InfoCardItem icon={<FaFileWaveform className='size-6' />} title='Status' value={status} color='orange' />
      </div>
      {showPaymentInfo && (
        <div className='mb-6 flex items-center gap-4 px-6'>
          <PaymentInfoCard title='Total Paid' value={totalPaid} type='paid' />
          <PaymentInfoCard title='Total Discount' value={totalDiscount} type='discount' />
          <PaymentInfoCard title='Due' value={totalDue - totalPaid - totalDiscount} type='due' />
        </div>
      )}
    </Card>
  );
};

type TColorType = 'blue' | 'green' | 'purple' | 'orange';
type InfoCardItemProps = { icon: ReactNode; title: string; value: string | ReactNode; color?: TColorType };

const InfoCardItem = ({ icon, title, value, color = 'blue' }: InfoCardItemProps) => {
  const colorConfig = {
    blue: {
      container: 'bg-blue-50 hover:bg-blue-100',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      value: 'text-blue-700',
    },
    green: {
      container: 'bg-green-50 hover:bg-green-100',
      icon: 'text-green-600',
      title: 'text-green-900',
      value: 'text-green-700',
    },
    purple: {
      container: 'bg-purple-50 hover:bg-purple-100',
      icon: 'text-purple-600',
      title: 'text-purple-900',
      value: 'text-purple-700',
    },
    orange: {
      container: 'bg-orange-50 hover:bg-orange-100',
      icon: 'text-orange-600',
      title: 'text-orange-900',
      value: 'text-orange-700',
    },
  };

  const config = colorConfig[color];

  return (
    <div className={cn('flex items-center gap-4 rounded-lg p-3 transition-colors', config.container)}>
      <div className={cn(config.icon)}>{icon}</div>
      <div>
        <p className={cn('text-sm font-medium', config.title)}>{title}</p>
        <p className={config.value}>{value}</p>
      </div>
    </div>
  );
};

type TPaymentType = 'paid' | 'due' | 'discount';
type TPaymentInfoCardProps = { title: string; value: number; type: TPaymentType };

export const PaymentInfoCard = ({ title, value, type }: TPaymentInfoCardProps) => {
  const colorConfig = {
    paid: {
      container: 'bg-primary-50 hover:bg-primary-100',
      text: 'text-primary',
    },
    discount: {
      container: 'bg-blue-50 hover:bg-blue-100',
      text: 'text-blue-500',
    },
    due: {
      container: 'bg-red-50 hover:bg-red-100',
      text: 'text-red-500',
    },
  };

  const config = colorConfig[type];

  return (
    <div
      className={cn(
        'flex w-full items-center gap-4 rounded-xl p-4 shadow-sm transition-colors duration-200',
        config.container,
      )}
    >
      <div className={cn('rounded-full bg-white p-2 shadow', config.text)}>
        <DollarSignIcon className='size-4' />
      </div>

      <div className='flex flex-col'>
        <p className={cn('text-sm font-medium', config.text)}>{title}</p>
        <p className={cn('text-lg font-semibold', config.text)}>{value}</p>
      </div>
    </div>
  );
};
