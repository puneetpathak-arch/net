
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { goals } from '@/lib/data';
import { ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GoalProgressCircle } from './goal-progress-circle';
import type { Goal } from '@/lib/types';
import { Button } from '../ui/button';

function GoalCard({ goal }: { goal: Goal }) {
  const percentage = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  return (
    <Card
      className="flex flex-col border-2 h-full"
      style={{ borderColor: `hsl(var(--${goal.color}))` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <goal.icon
            className="w-6 h-6"
            style={{ color: `hsl(var(--${goal.color}))` }}
          />
          <span className="font-bold">{goal.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
        <GoalProgressCircle
          percentage={percentage}
          savedAmount={goal.savedAmount}
          targetAmount={goal.targetAmount}
          color={goal.color}
        />
        <Button size="sm" variant="outline">Add Funds</Button>
      </CardContent>
    </Card>
  );
}

export function GoalsCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Your Goals <Target className="w-5 h-5" />
          </CardTitle>
          <Link href="#" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <CardDescription>
          Your progress towards your financial goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center">
        {goals.length > 0 ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {goals.map((goal) => (
                <CarouselItem key={goal.id} className="md:basis-full lg:basis-full">
                  <div className="p-1 h-full">
                    <GoalCard goal={goal} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-full w-full py-8">
            <p className="text-muted-foreground">No savings goals set yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
