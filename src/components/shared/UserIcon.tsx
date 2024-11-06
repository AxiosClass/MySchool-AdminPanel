interface IProps {
  username: string;
}

export function UserIcon({ username }: IProps) {
  return (
    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-white'>
      {username[0]}
    </div>
  );
}
