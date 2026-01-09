
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { BudgetSummaryCard } from '@/components/dashboard/budget-summary-card';
import { GoalsCard } from '@/app/(main)/dashboard/goals-card';
import { RecentExpensesCard } from '@/components/dashboard/recent-expenses-card';
import { AiSavingsCard } from '@/components/dashboard/ai-savings-card';
import { tips } from '@/lib/data';
import { QuickStatCard } from '@/components/dashboard/quick-stat-card';
import { TrendingUp, Target, Sparkles, Loader2 } from 'lucide-react';
import { TipsCard } from '@/components/dashboard/tips-card';
import { AddExpenseSheet } from '@/components/add-expense-sheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Expense, Budget, Goal } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { startOfWeek, isWithinInterval, getMonth, getYear, differenceInDays } from 'date-fns';
import { useUser } from '@/firebase';
import { getExpenses, addExpense, getBudget, getGoals, addFundsToGoal } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { FinancialHealthScoreCard } from '@/components/dashboard/financial-health-score-card';

function BudgetSummarySkeleton() {
    return (
        <Card className="bg-card/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-purple-200/50 relative overflow-hidden h-full">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <Skeleton className="h-9 w-48 mb-2" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                    <Skeleton className="w-20 h-20 rounded-2xl" />
                </div>
                <div className="flex-grow mb-6">
                    <Skeleton className="h-12 w-3/4 mb-3" />
                    <Skeleton className="h-7 w-1/2" />
                </div>
                <Skeleton className="h-5 w-full mb-8" />
                <div className="mt-auto">
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </Card>
    );
}

function QuickStatsSkeleton() {
    return (
        <>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-indigo-200/50">
                 <div className="relative z-10 flex items-center gap-4">
                    <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-28" />
                    </div>
                </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-indigo-200/50">
                 <div className="relative z-10 flex items-center gap-4">
                    <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-8 w-12" />
                    </div>
                </div>
            </div>
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-indigo-200/50">
                 <div className="relative z-10 flex items-center gap-4">
                    <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-2xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default function DashboardPage() {
    const { user, loading: userLoading } = useUser();
    const [greeting, setGreeting] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [budget, setBudget] = useState<Budget | null>(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();
    const { toast } = useToast();

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [userExpenses, userBudget, userGoals] = await Promise.all([
                getExpenses(user.uid),
                getBudget(user.uid),
                getGoals(user.uid)
            ]);
            setExpenses(userExpenses);
            setBudget(userBudget);
            setGoals(userGoals);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not load your financial data.'
            });
        } finally {
            setLoading(false);
        }
    }, [user, toast]);

    useEffect(() => {
        if(user) {
            fetchData();
        }
    }, [user, fetchData]);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const handleAddExpense = async (newExpense: Omit<Expense, 'id' | 'date'>) => {
        if (!user) return;
        
        try {
            await addExpense(user.uid, newExpense);
            fetchData(); // Refetch all data to ensure consistency
        } catch (error) {
            console.error("Error adding expense:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not add your expense.'
            });
        }
    };
    
    const handleFundAdded = async (goalId: string, amount: number) => {
        if (!user) return;
        try {
            await addFundsToGoal(user.uid, goalId, amount);
            fetchData();
        } catch(e) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not add funds to your goal."
            });
        }
    };

    const calculatedBudget = useMemo(() => {
        if (!budget) return null;

        const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        const updatedCategoryBudgets = budget.categoryBudgets.map(cb => {
            const spent = expenses
                .filter(exp => exp.category === cb.category)
                .reduce((acc, exp) => acc + exp.amount, 0);
            return { ...cb, spent };
        });

        return { ...budget, spent: totalSpent, categoryBudgets: updatedCategoryBudgets };
    }, [expenses, budget]);


    const weeklySpend = useMemo(() => {
        const today = new Date();
        const start = startOfWeek(today);
        return expenses
            .filter(exp => isWithinInterval(new Date(exp.date), { start, end: today }))
            .reduce((acc, exp) => acc + exp.amount, 0);
    }, [expenses]);
    
    const financialHealthScore = useMemo(() => {
        if (!calculatedBudget || !budget || !goals) return 0;
        
        const income = budget.total;
        if (income <= 0) return 0;

        // 1. Spending Discipline (50 points)
        const spendingRatio = calculatedBudget.spent / income;
        let spendingScore = 0;
        if (spendingRatio <= 0.8) {
            spendingScore = 50;
        } else if (spendingRatio <= 1) {
            // Score decreases from 50 to 0 as spending goes from 80% to 100%
            spendingScore = (1 - (spendingRatio - 0.8) / 0.2) * 50;
        }

        // 2. Savings Rate (30 points)
        const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
        const savingsRate = totalSaved / income;
        const targetSavingsRate = 0.15; // 15% is a good goal for students
        const savingsScore = Math.min((savingsRate / targetSavingsRate) * 30, 30);

        // 3. Savings Consistency (20 points)
        const mostRecentFunding = goals.reduce((latest, goal) => {
            if (!goal.lastFundedDate) return latest;
            const goalDate = new Date(goal.lastFundedDate);
            return goalDate > latest ? goalDate : latest;
        }, new Date(0));
        
        let consistencyScore = 0;
        if (mostRecentFunding > new Date(0)) {
            const daysSinceFunding = differenceInDays(new Date(), mostRecentFunding);
            if (daysSinceFunding <= 7) {
                consistencyScore = 20; // Saved in the last week
            } else if (daysSinceFunding <= 30) {
                consistencyScore = 10; // Saved in the last month
            }
        }
        
        return Math.round(spendingScore + savingsScore + consistencyScore);
    }, [calculatedBudget, goals, budget]);


    const userName = user?.displayName?.split(' ')[0] || 'there';

  if (userLoading) {
      return (
          <div className="flex justify-center items-center h-full">
             <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-2 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-400/10"></div>
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {greeting}, {userName}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">Here's your financial overview for this month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {loading ? (
             <QuickStatsSkeleton />
         ) : (
            <>
                <QuickStatCard icon={TrendingUp} label="This Week" value={`₹${weeklySpend.toLocaleString()}`} className="text-indigo-600" />
                <QuickStatCard icon={Sparkles} label="New Tips" value={tips.length.toString()} className="text-pink-600" />
                <QuickStatCard icon={Target} label="Active Goals" value={goals.length.toString()} className="text-green-600"/>
                <FinancialHealthScoreCard score={financialHealthScore} />
            </>
         )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
             {loading || !calculatedBudget ? (
              <BudgetSummarySkeleton />
            ) : (
              <BudgetSummaryCard budget={calculatedBudget} />
            )}
        </div>
        <div className="md:col-span-2">
            <GoalsCard goals={goals} loading={loading} onFundAdded={handleFundAdded} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
         <div className="md:col-span-3">
            <RecentExpensesCard expenses={expenses} loading={loading} />
        </div>
        <div className="md:col-span-2">
            <AiSavingsCard />
        </div>
      </div>
      
       <div className="grid gap-6">
         <div>
            <TipsCard />
        </div>
      </div>
        {isMobile ? null : (
            <div className="fixed bottom-8 right-8 z-50">
                <AddExpenseSheet onExpenseAdded={handleAddExpense}>
                    <Button size="icon" className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90">
                        <Plus className="h-8 w-8" />
                    </Button>
                </AddExpenseSheet>
            </div>
        )}
    </div>
  );
}
