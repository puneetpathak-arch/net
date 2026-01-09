
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CategoryBudget, Budget } from '@/lib/types';

function getProgressColor(percentage: number): string {
  if (percentage > 90) return 'bg-destructive';
  if (percentage > 70) return 'bg-yellow-500';
  return 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600';
}

function CategoryRow({ categoryBudget }: { categoryBudget: CategoryBudget }) {
  const remaining = categoryBudget.total - categoryBudget.spent;
  const percentage =
    categoryBudget.total > 0
      ? Math.round((categoryBudget.spent / categoryBudget.total) * 100)
      : 0;

  return (
    <TableRow>
      <TableCell className="font-medium">{categoryBudget.category}</TableCell>
      <TableCell>₹{categoryBudget.spent.toLocaleString()}</TableCell>
      <TableCell>₹{categoryBudget.total.toLocaleString()}</TableCell>
      <TableCell
        className={cn(
          remaining < 0 ? 'text-destructive' : 'text-muted-foreground'
        )}
      >
        {remaining < 0
          ? `-₹${Math.abs(remaining).toLocaleString()}`
          : `₹${remaining.toLocaleString()}`}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Progress
            value={percentage}
            className="w-24 h-2 bg-gray-200"
            indicatorClassName={getProgressColor(percentage)}
          />
          <span className="text-xs w-10 text-right">{percentage}%</span>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function BudgetDetailsDialog({ budget }: { budget: Budget }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Budget Details</DialogTitle>
          <DialogDescription>
            A detailed breakdown of your spending by category for this month.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budget.categoryBudgets.map((cat) => (
                <CategoryRow key={cat.category} categoryBudget={cat} />
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
