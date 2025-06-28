import { QK } from '@/api';
import { getAttendanceTrends, TAttendanceTrend } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { BarChartLoader } from './DashboardLoader';
import { Message } from '@/components/shared';
import { green } from 'tailwindcss/colors';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';

export const AttendanceTrends = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW, 'ATTENDANCE_TRENDS'],
    queryFn: () => getAttendanceTrends({ range: '15' }),
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
  const config = { count: { label: 'Count' } };

  const maxValue = useMemo(() => {
    const max = data.reduce((max, eachData) => (eachData.count > max ? eachData.count : max), 0);
    return Math.ceil(max + (max * 10) / 100);
  }, [data]);

  return (
    <Card className='w-full rounded-md py-2'>
      <CardHeader>
        <CardTitle className='px-6 text-xl'>Attendance Trends.</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className='h-[250px] w-full' config={config}>
          <BarChart accessibilityLayer data={data} barSize={10}>
            <CartesianGrid vertical={false} strokeDasharray='2 2' stroke='#f0f0f0' />
            <Bar dataKey='count' fill={green[800]} radius={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <XAxis
              dataKey='date'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(val) => new Date(val).getDate().toString().padStart(2, '0')}
            />
            <YAxis domain={[0, maxValue]} axisLine={false} tickMargin={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
