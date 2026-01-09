
"use client"

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { startOfWeek, endOfWeek, eachWeekOfInterval, format, isSameWeek } from 'date-fns';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Skeleton } from '../ui/skeleton';
import type { Expense } from '@/lib/types';


const chartConfig = {
  spending: {
    label: "Spending",
    color: "hsl(var(--chart-1))",
  },
}

export function SpendingBarChart({ expenses }: { expenses: Expense[] | null }) {
    
  const chartData = useMemo(() => {
    if (!expenses) return [];

    const now = new Date();
    const fourWeeksAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 27);
    
    const weeks = eachWeekOfInterval({
        start: fourWeeksAgo,
        end: now,
    }, { weekStartsOn: 1 });

    if (weeks.length < 4) {
        // Ensure we always have 4 weeks
        while(weeks.length < 4) {
            weeks.unshift(startOfWeek(new Date(weeks[0]).setDate(weeks[0].getDate() - 7), { weekStartsOn: 1 }));
        }
    }


    const weeklySpending = weeks.slice(-4).map((weekStart, index) => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        const spending = expenses
            .filter(exp => isSameWeek(new Date(exp.date), weekStart, { weekStartsOn: 1 }))
            .reduce((acc, exp) => acc + exp.amount, 0);
        
        return { week: `Week ${index + 1}`, weekLabel: `${format(weekStart, 'MMM d')}`, spending };
    });

    return weeklySpending;

  }, [expenses]);


  if (!expenses) {
      return <Skeleton className="h-[350px] w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Spending</CardTitle>
        <CardDescription>Your spending over the last 4 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="weekLabel"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                  tickFormatter={(value) => `₹${Number(value) / 1000}k`}
              />
              <ChartTooltip 
                  cursor={false}
                  content={<ChartTooltipContent 
                      formatter={(value, name, props) => [`₹${(value as number).toLocaleString()}`, props.payload.week]}
                      indicator="dot"
                  />} 
              />
              <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
            </BarChart>
          </ChartContainer>
        ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No spending data available.
            </div>
        )}
      </CardContent>
    </Card>
  )
}
