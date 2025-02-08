export const UserIcon = ({ username }: TUserIconProps) => {
  return (
    <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white'>
      {username[0]}
    </div>
  );
};

// types
type TUserIconProps = { username: string };
