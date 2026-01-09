import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Expense } from "@/lib/types";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const categoryColors: { [key: string]: string } = {
    'Mess': 'bg-red-100 text-red-800 border-red-200',
    'Canteen': 'bg-orange-100 text-orange-800 border-orange-200',
    'Food': 'bg-orange-100 text-orange-800 border-orange-200',
    'Transport': 'bg-blue-100 text-blue-800 border-blue-200',
    'Education': 'bg-purple-100 text-purple-800 border-purple-200',
    'Entertainment': 'bg-red-100 text-red-800 border-red-200',
    'Healthcare': 'bg-green-100 text-green-800 border-green-200',
    'Shopping': 'bg-pink-100 text-pink-800 border-pink-200',
    'Groceries': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Travel': 'bg-green-100 text-green-800 border-green-200',
    'Rent/Hostel': 'bg-blue-100 text-blue-800 border-blue-200',
    'Fees/Exam': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Recharge/Subscriptions': 'bg-purple-100 text-purple-800 border-purple-200',
    'Other': 'bg-gray-100 text-gray-800 border-gray-200',
    'Others': 'bg-gray-100 text-gray-800 border-gray-200',
};

function RecentExpensesSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                    <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                </div>
            ))}
        </div>
    );
}

export function RecentExpensesCard({ expenses, loading }: { expenses: Expense[] | null, loading: boolean }) {
  return (
    <Card className="bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
            <CardDescription>Your last 5 transactions.</CardDescription>
          </div>
           <Button variant="ghost" size="sm" asChild>
                <Link href="#">
                    View all
                    <ArrowRight className="w-4 h-4 ml-2"/>
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[240px]">
        {loading ? (
            <RecentExpensesSkeleton />
        ) : expenses && expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <li key={expense.id} className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base truncate">{expense.description}</p>
                  <Badge variant="outline" className={`font-normal text-xs ${categoryColors[expense.category] || categoryColors['Others']}`}>
                    {expense.category}
                  </Badge>
                </div>
                <p className="font-bold text-sm md:text-base text-right text-red-600 ml-2">-₹{expense.amount.toLocaleString()}</p>
              </li>
            ))}
          </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No expenses yet.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
