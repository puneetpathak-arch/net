
'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChartHorizontal, GraduationCap, User, Plus, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddExpenseSheet } from '@/components/add-expense-sheet';
import { Button } from './ui/button';
import type { Expense } from '@/lib/types';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/analytics', icon: BarChartHorizontal, label: 'Analytics' },
  { href: 'add_expense', icon: Plus, label: 'Add' },
  { href: '/advisor', icon: Bot, label: 'Advisor' },
  { href: '/profile', icon: User, label: 'Profile' },
];

interface BottomNavProps {
    onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

export const BottomNav = forwardRef<HTMLDivElement, BottomNavProps>(({ onAddExpense }, ref) => {
  const pathname = usePathname();

  return (
    <div ref={ref} className="fixed bottom-0 left-0 z-50 w-full h-20 bg-card border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid h-full grid-cols-5 mx-auto">
        {navItems.map((item) => {
          const isActive = (item.href === '/dashboard' && pathname === item.href) || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          if (item.href === 'add_expense') {
            return (
              <div key={item.href} className="flex items-center justify-center">
                <AddExpenseSheet onExpenseAdded={onAddExpense}>
                    <Button variant="ghost" className="relative -top-6 flex items-center justify-center h-16 w-16 bg-gradient-to-br from-primary to-accent text-white rounded-full shadow-lg transition-transform active:scale-90 animate-bounce-on-load">
                        <item.icon className="w-8 h-8" />
                        <span className="sr-only">{item.label}</span>
                    </Button>
                </AddExpenseSheet>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex flex-col items-center justify-center px-2 text-center text-muted-foreground hover:bg-muted/50 transition-colors group"
            >
              <div className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-full transition-transform duration-300 group-active:scale-90",
                  isActive && "scale-110 -translate-y-1 bg-primary/10"
              )}>
                 <item.icon className={cn("w-6 h-6 mb-1 transition-colors", isActive && 'text-primary')} />
              
                <span className={cn(
                    "text-xs transition-colors",
                    isActive ? 'font-bold text-primary' : 'text-muted-foreground'
                )}>
                  {item.label}
                </span>
                {isActive && <div className="absolute bottom-2 h-1 w-1 rounded-full bg-primary" />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
});

BottomNav.displayName = 'BottomNav';
