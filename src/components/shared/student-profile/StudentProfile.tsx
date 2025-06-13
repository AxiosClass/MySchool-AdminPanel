import moment from 'moment';

import { TStudentInfo } from '@/api/query';
import { Card } from '@/components/ui/card';
import { dateFormatString } from '@/data';
import { getInitials } from '@/helpers';
import { cn } from '@/lib/utils';
import { GraduationCapIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { GiTeacher } from 'react-icons/gi';
import { FaCalendar } from 'react-icons/fa';
import { IoBook } from 'react-icons/io5';
import { FaFileWaveform } from 'react-icons/fa6';

type TStudentProfileProps = TStudentInfo;

export const StudentProfile = ({
  id,
  name,
  status,
  admittedAt,
  classroomName,
  classLevel,
  className,
}: TStudentProfileProps) => {
  return (
    <Card className='overflow-hidden border-0 bg-white transition-all duration-500'>
      <div className={`relative h-32 bg-gradient-to-r from-primary-400 to-primary-600`}>
        <div className='absolute inset-0 bg-black bg-opacity-20' />
        <div className='absolute bottom-4 left-6'>
          <div className='flex size-20 items-center justify-center rounded-full bg-white shadow-xl'>
            <span
              className={`bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-2xl font-bold text-transparent`}
            >
              {getInitials(name)}
            </span>
          </div>
        </div>
      </div>

      <div className='p-6 pt-8'>
        <div className='mb-6'>
          <h2 className='mb-1 text-2xl font-bold'>{name}</h2>
          <p className='flex items-center text-muted-foreground'>
            <GraduationCapIcon className='mr-2 h-4 w-4' />
            Student ID: {id}
          </p>
        </div>

        <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <InfoCardItem
            icon={<IoBook className='size-6' />}
            title='Class'
            value={`${className} (${classLevel})`}
            color='blue'
          />
          <InfoCardItem icon={<GiTeacher className='size-6' />} title='Classroom' value={classroomName} color='green' />
          <InfoCardItem
            icon={<FaCalendar className='size-6' />}
            title='Admitted Date'
            value={moment(admittedAt).format(dateFormatString.basic)}
            color='purple'
          />
          <InfoCardItem icon={<FaFileWaveform className='size-6' />} title='Status' value={status} color='orange' />
        </div>
      </div>
    </Card>
  );
};

type InfoCardItemProps = {
  icon: ReactNode;
  title: string;
  value: string | ReactNode;
  color?: keyof typeof colorConfig;
};

const InfoCardItem = ({ icon, title, value, color = 'blue' }: InfoCardItemProps) => {
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

// Config
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
