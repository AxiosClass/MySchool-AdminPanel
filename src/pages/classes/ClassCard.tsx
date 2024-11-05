import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { IClass } from '@/lib/types/class';

export function ClassCard({ name, level }: IClass) {
  return (
    <Card className='border-primary-100 bg-transparent'>
      <CardHeader className='flex flex-row items-center gap-6'>
        <CardTitle className='text-xl'>Class : {name}</CardTitle>
        <span className='ml-auto rounded-md bg-primary px-4 py-2 font-semibold text-white'>
          {level}
        </span>
      </CardHeader>
    </Card>
  );
}
