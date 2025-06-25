import { QK } from '@/api';
import { getPaymentTrends, TPaymentTrend } from '@/api/query';
import { useQuery } from '@tanstack/react-query';
import { BarChartLoader } from './DashboardLoader';
import { Message } from '@/components/shared';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { orange } from 'tailwindcss/colors';

export const PaymentTrends = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QK.OVERVIEW, 'PAYMENT_TRENDS'],
    queryFn: getPaymentTrends,
    select: (res) => res.data,
  });

  if (isLoading) return <BarChartLoader />;

  if (!data)
    return (
      <div className='min-h-40'>
        <Message message='No Data Found' />
      </div>
    );

  return <PaymentsBarChart data={data} />;
};

type TPaymentsBarChartProps = { data: TPaymentTrend[] };
const PaymentsBarChart = ({ data }: TPaymentsBarChartProps) => {
  const config = { amount: { label: 'Amount' } };

  const maxValue = useMemo(() => {
    const max = data.reduce((max, eachData) => (eachData.amount > max ? eachData.amount : max), 0);
    return Math.ceil(max + (max * 10) / 100);
  }, [data]);

  return (
    <Card className='w-full rounded-md py-2'>
      <CardHeader>
        <CardTitle className='px-6 text-xl'>Payment Trends.</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className='h-[500px] w-full' config={config}>
          <BarChart accessibilityLayer data={data} barSize={10}>
            <CartesianGrid vertical={false} strokeDasharray='2 2' stroke='#f0f0f0' />
            <Bar dataKey='amount' fill={orange[700]} radius={4} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dashed' />} />
            <XAxis dataKey='month' tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis domain={[0, maxValue]} axisLine={false} tickMargin={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
