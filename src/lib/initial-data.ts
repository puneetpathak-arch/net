import type { Budget, Goal } from './types';
import { Bus, PiggyBank, Headphones, Plane, Gift, Laptop } from 'lucide-react';

export const initialBudget: Budget = {
  total: 15000,
  spent: 0,
  categoryBudgets: [
    { category: 'Mess', total: 4000, spent: 0 },
    { category: 'Canteen', total: 1500, spent: 0 },
    { category: 'Travel', total: 1000, spent: 0 },
    { category: 'Rent/Hostel', total: 5000, spent: 0 },
    { category: 'Education', total: 1000, spent: 0 },
    { category: 'Fees/Exam', total: 1500, spent: 0 },
    { category: 'Recharge/Subscriptions', total: 500, spent: 0 },
    { category: 'Entertainment', total: 1000, spent: 0 },
    { category: 'Shopping', total: 1000, spent: 0 },
    { category: 'Others', total: 500, spent: 0 },
  ],
};


export const goals: Goal[] = [
  {
    id: 'g1',
    name: 'New Headphones',
    targetAmount: 8000,
    savedAmount: 2500,
    deadline: '2024-12-31',
    icon: Headphones,
    color: 'chart-1',
  },
  {
    id: 'g2',
    name: 'Goa Trip',
    targetAmount: 20000,
    savedAmount: 15000,
    deadline: '2025-03-31',
    icon: Plane,
    color: 'chart-2',
  },
    {
    id: 'g3',
    name: 'New Laptop',
    targetAmount: 75000,
    savedAmount: 30000,
    deadline: '2025-06-30',
    icon: Laptop,
    color: 'chart-3',
  },
];
