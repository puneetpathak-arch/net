
"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { Budget } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function CategoryPieChart({ budget }: { budget: Budget | null }) {
  const chartData = React.useMemo(() => {
    if (!budget) return [];
    return budget.categoryBudgets.filter(b => b.spent > 0).map((b, index) => ({
      category: b.category,
      amount: b.spent,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`
    }));
  }, [budget]);

  const chartConfig = React.useMemo(() => {
    if (!budget) return {};
    return {
      amount: {
        label: "Amount (₹)",
      },
      ...Object.fromEntries(
        budget.categoryBudgets.map((b, index) => [
          b.category,
          {
            label: b.category,
            color: `hsl(var(--chart-${(index % 5) + 1}))`,
          },
        ])
      ),
    }
  }, [budget]);


  if (!budget) {
      return <Skeleton className="h-[400px] w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category-wise Spending</CardTitle>
        <CardDescription>Current month's spending distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {chartData.length > 0 ? (
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent 
                      formatter={(value) => `₹${(value as number).toLocaleString()}`}
                      hideLabel
                  />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                  {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        ) : (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                No spending data for this month yet.
            </div>
        )}
      </CardContent>
    </Card>
  )
}
