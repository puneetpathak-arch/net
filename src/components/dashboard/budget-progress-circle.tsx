
'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface BudgetProgressCircleProps {
  percentage: number;
}

export function BudgetProgressCircle({ percentage }: BudgetProgressCircleProps) {
  const chartData = [{ name: 'spent', value: percentage, fill: 'var(--color-spent)' }];

  const color = "hsl(var(--chart-1))";

  return (
    <ChartContainer
      config={{
        spent: {
          label: 'Spent',
          color: color,
        }
      }}
      className="mx-auto aspect-square h-full w-full max-w-[150px] relative"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-270}
        endAngle={90}
        innerRadius={60}
        outerRadius={75}
        barSize={16}
        cx="50%"
        cy="50%"
      >
        <RadialBar
          dataKey="value"
          background={{ fill: 'hsl(var(--muted))' }}
          cornerRadius={8}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </RadialBarChart>
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold" style={{ color: 'hsl(var(--chart-1))' }}>{percentage}%</span>
            <span className="text-sm text-muted-foreground">Spent</span>
        </div>
    </ChartContainer>
  );
}
