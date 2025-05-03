import { cn } from '@/lib/utils';

const UserIconConfig = {
  sm: 'text-xl size-10',
  md: 'text-2xl size-16',
  lg: 'text-6xl size-32',
  xl: 'text-9xl size-40',
};

export const UserIcon = ({ username, className, size = 'sm' }: TUserIconProps) => {
  const classNameConfig = UserIconConfig[size];

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white',
        classNameConfig,
        className,
      )}
    >
      {username[0]}
    </div>
  );
};

// types
type TUserIconProps = { username: string; className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' };
