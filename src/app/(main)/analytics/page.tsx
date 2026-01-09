
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { SpendingBarChart } from "@/components/analytics/spending-bar-chart";
import { BarChartHorizontal, IndianRupee, PieChart, TrendingUp, CalendarDays, Loader2 } from "lucide-react";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";
import { CategoryPieChart } from '@/components/analytics/category-pie-chart';
import { useUser } from '@/firebase';
import type { Budget, Expense } from '@/lib/types';
import { startOfWeek, isWithinInterval, format } from 'date-fns';
import { getExpenses, getBudget } from '@/services/firestore';
import { useToast } from '@/hooks/use-toast';

export default function AnalyticsPage() {
  const { user } = useUser();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
        const [userExpenses, userBudget] = await Promise.all([
            getExpenses(user.uid),
            getBudget(user.uid)
        ]);
        setExpenses(userExpenses);
        setBudget(userBudget);
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not load your analytics data.'
        });
    } finally {
        setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
      fetchData();
  }, [fetchData]);


  const { avgDailySpend, mostSpentCategory, highestSpendingDay } = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { avgDailySpend: 0, mostSpentCategory: 'N/A', highestSpendingDay: 'N/A' };
    }

    const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const uniqueDays = new Set(expenses.map(e => new Date(e.date).toDateString())).size;
    const avgDailySpend = uniqueDays > 0 ? totalSpend / uniqueDays : 0;

    const categorySpends = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const mostSpentCategory = Object.keys(categorySpends).reduce((a, b) => categorySpends[a] > categorySpends[b] ? a : b, 'N/A');

    const dailySpends = expenses.reduce((acc, exp) => {
        const day = new Date(exp.date).toDateString();
        acc[day] = (acc[day] || 0) + exp.amount;
        return acc;
    }, {} as Record<string, number>);

    const highestDay = Object.keys(dailySpends).reduce((a,b) => dailySpends[a] > dailySpends[b] ? a : b, 'N/A');
    const highestSpendingDay = highestDay !== 'N/A' ? format(new Date(highestDay), 'MMMM do') : 'N/A';

    return { avgDailySpend, mostSpentCategory, highestSpendingDay };
  }, [expenses]);

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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <BarChartHorizontal className="w-7 h-7 md:w-8 md:h-8"/>
            Your Spending Insights
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">Analyze your spending patterns.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <QuickStatCard icon={IndianRupee} label="Avg. Daily Spend" value={`₹${avgDailySpend.toFixed(0)}`} className="text-indigo-600" />
          <QuickStatCard icon={PieChart} label="Most Spent On" value={mostSpentCategory} className="text-pink-600" />
          <QuickStatCard icon={CalendarDays} label="Highest Day" value={highestSpendingDay} className="text-green-600" />
          <QuickStatCard icon={TrendingUp} label="Trend" value="N/A" className="text-green-600"/>
      </div>
      
       <div className="grid gap-6 md:grid-cols-2">
         <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CategoryPieChart budget={calculatedBudget} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SpendingBarChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

    