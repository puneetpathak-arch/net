'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FinancialHealthScoreCardProps {
  score: number;
}

export function FinancialHealthScoreCard({ score }: FinancialHealthScoreCardProps) {
  const getScoreDetails = () => {
    if (score >= 85) {
      return { emoji: '😃', label: 'Excellent', color: 'text-green-600' };
    }
    if (score >= 65) {
      return { emoji: '🙂', label: 'Good', color: 'text-yellow-600' };
    }
    return { emoji: '🥲', label: 'Needs Improvement', color: 'text-red-600' };
  };

  const { emoji, label, color } = getScoreDetails();

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-indigo-200/50 hover:shadow-2xl hover:border-indigo-300/70 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-3xl md:text-4xl">
          {emoji}
        </div>
        <div>
          <p className="text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide">Health Score</p>
          <p className={`text-2xl md:text-4xl font-bold ${color}`}>{score}/100</p>
        </div>
      </div>
    </div>
  );
}
