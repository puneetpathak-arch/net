import type { LucideIcon } from "lucide-react";

export type User = {
  name: string;
  college: string;
  avatarUrl: string;
};

export type UserProfile = {
    email?: string | null;
    displayName?: string | null;
    college?: string;
    budget?: Budget;
}

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Education' | 'Entertainment' | 'Healthcare' | 'Shopping' | 'Other' | 'Mess' | 'Canteen' | 'Groceries' | 'Travel' | 'Rent/Hostel' | 'Fees/Exam' | 'Recharge/Subscriptions' | 'Others';
  date: string; // ISO string
};

export type Budget = {
  total: number;
  spent: number;
  categoryBudgets: CategoryBudget[];
};

export type CategoryBudget = {
  category: Expense['category'];
  total: number;
  spent: number;
};

export type Goal = {
  id:string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string; // ISO string
  icon: string;
  color: 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5';
  lastFundedDate?: string; // ISO string
};

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: {
    state?: string[];
    category?: string[];
    income?: string;
  };
  link: string;
};

export type Tip = {
  id:string;
  text: string;
  icon: React.ElementType;
};

export type Notification = {
    id: string;
    type: 'budget-warning' | 'budget-over' | 'new-tip' | 'goal-achieved';
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
}
