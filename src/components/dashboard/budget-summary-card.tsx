
'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { BudgetDetailsDialog } from './budget-details-dialog';
import type { Budget } from '@/lib/types';

export function BudgetSummaryCard({ budget }: { budget: Budget }) {
  const percentage = budget.total > 0 ? Math.round((budget.spent / budget.total) * 100) : 0;
  const remaining = budget.total - budget.spent;

  const getEmoji = () => {
    if (percentage > 100) return '😥';
    if (percentage > 75) return '🤔';
    if (percentage > 50) return '👍';
    return '🎉';
  };

  return (
    <Card className="bg-card/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-purple-200/50 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 opacity-40"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Monthly Budget
                    </h2>
                    <p className="text-gray-600 font-medium">
                        Your spending for{' '}
                        {new Date().toLocaleString('default', { month: 'long' })}
                    </p>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 animate-bounce-slow">
                    <span className="text-4xl">💰</span>
                </div>
            </div>
            
            <div className="flex-grow mb-6">
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent">₹{budget.spent.toLocaleString()}</span>
                    <span className="text-2xl text-gray-400 font-medium">/ ₹{budget.total.toLocaleString()}</span>
                </div>
                 <p className="text-gray-700 flex items-center gap-2 text-lg font-medium">
                  {percentage > 100 ? (
                      <>
                        <span className="text-red-500 font-bold text-xl">₹{Math.abs(remaining).toLocaleString()}</span> over budget {getEmoji()}
                      </>
                  ) : (
                     <>
                        <span className="text-green-600 font-bold text-xl">₹{remaining.toLocaleString()}</span> remaining this month {getEmoji()}
                     </>
                  )}
                </p>
            </div>

            <div className="w-full bg-gradient-to-r from-gray-200 via-purple-100 to-pink-100 rounded-full h-5 mb-8 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-5 rounded-full shadow-lg transition-all duration-1000 relative overflow-hidden" style={{ width: `${Math.min(percentage, 100)}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
            </div>

            <div className="mt-auto">
                <BudgetDetailsDialog budget={budget} />
            </div>
        </div>
    </Card>
  );
}
