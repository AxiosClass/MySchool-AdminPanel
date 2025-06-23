import { PageTitle } from '@/components/shared';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { DueClassDetails } from './DuesClassDetails';

export default function DuesClassDetailsPage() {
  const { level } = useParams();
  const title = `Dues ${level ? 'Class ' + level : ''}`;

  return (
    <>
      <PageTitle title={title} />
      <ScrollArea>
        <DueClassDetails />
      </ScrollArea>
    </>
  );
}
