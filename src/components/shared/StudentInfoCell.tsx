import { Link } from 'react-router-dom';
import { UserIcon } from './UserIcon';

type TStudentInfoCellProps = { id: string; name: string; cardId?: string };

export const StudentInfoCell = ({ id, name, cardId }: TStudentInfoCellProps) => (
  <div className='flex gap-4'>
    <UserIcon username={name} />
    <div>
      <Link to={`/student/${id}`}>
        <p className='text-base font-semibold'>{name}</p>
      </Link>
      <p className='text-sm text-muted-foreground'>ID : {id}</p>
      {cardId && <p className='text-sm text-muted-foreground'>CardID : {cardId}</p>}
    </div>
  </div>
);
