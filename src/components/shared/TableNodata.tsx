import { TableCell, TableRow } from '../ui/table';
import { Message } from './Message';

type TTableNodataProps = { message: string; colSpan: number };

export const TableNoData = ({ message, colSpan }: TTableNodataProps) => (
  <TableRow>
    <TableCell colSpan={colSpan}>
      <Message message={message} className='py-6' />
    </TableCell>
  </TableRow>
);
