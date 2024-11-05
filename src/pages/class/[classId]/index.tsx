import { CreateClassroom } from './create-classroom';
import { PageTitle } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { TiArrowBack } from 'react-icons/ti';
import { Link } from 'react-router-dom';

export default function ClassDetailsPage() {
  return (
    <PageTitle title='Class Details'>
      <main>
        <div className='flex items-center gap-4'>
          <Link to={'/classes'}>
            <Button className='h-10 w-10 text-white'>
              <span className='text-2xl'>
                <TiArrowBack />
              </span>
            </Button>
          </Link>
          <p className='text-3xl font-semibold'>Class : 1</p>
          <div className='ml-auto'>
            <CreateClassroom />
          </div>
        </div>
      </main>
    </PageTitle>
  );
}
