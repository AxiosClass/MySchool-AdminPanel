import { QK } from '@/api';
import { getAttendanceTrends, TAttendanceTrend } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { BarChartLoader } from './DashboardLoader';
import { Message } from '@/components/shared';
import { green } from 'tailwindcss/colors';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export const AttendanceTrends = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.META_DATA, 'ATTENDANCE_TRENDS'],
    queryFn: getAttendanceTrends,
    select: (res) => res.data,
  });

  if (isLoading) return <BarChartLoader />;

  if (!data)
    return (
      <div className='min-h-40'>
        <Message message='No Data Found' />
      </div>
    );

  return <AttendanceBarChart data={data} />;
};

type TAttendanceBardChartProps = { data: TAttendanceTrend[] };
const AttendanceBarChart = ({ data }: TAttendanceBardChartProps) => {
  const config = { count: { label: 'Count', color: 'red' } };

  return (
    <ChartContainer className='h-[500px] w-full' config={config}>
      <BarChart accessibilityLayer data={data}>
        <Bar dataKey='count' fill={green[500]} radius={4} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
        <XAxis dataKey='date' tickLine={false} tickMargin={10} axisLine={false} />
        <CartesianGrid vertical={false} />
      </BarChart>
    </ChartContainer>
  );
};
