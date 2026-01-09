
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { PiggyBank } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import { AddExpenseSheet } from '@/components/add-expense-sheet';
import { BottomNav } from '@/components/bottom-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { addExpense } from '@/services/firestore';
import type { Expense } from '@/lib/types';
import { useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu } from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [open, setOpen] = React.useState(isMobile ? false : true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);


  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const handleAddExpense = async (newExpense: Omit<Expense, 'id' | 'date'>) => {
    if (!user) return;
    await addExpense(user.uid, newExpense);
    // You might want to refresh the expenses list here or use a real-time listener
  };

  if (loading) {
    // You can return a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <PiggyBank className="w-16 h-16 animate-bounce text-primary"/>
      </div>
    );
  }

  if (!user) {
    return null; // or a redirect component
  }

  return (
     <SidebarProvider open={!isMobile} onOpenChange={setOpen}>
      <div className="min-h-screen w-full bg-background text-foreground flex">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <Sidebar>
            <SidebarHeader className="flex items-center gap-3 mb-4 p-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-float">
                <PiggyBank className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-data-[state=collapsed]:hidden">
                EduFinance
              </span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <MainNav onNavItemClick={() => isMobile && setOpen(false)} />
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4 px-2 pt-6 border-t border-slate-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/50">
                    {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden group-data-[state=collapsed]:hidden">
                    <p className="font-semibold text-sm truncate">{user.displayName || user.email}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
              {children}
          </main>
        </div>
        
        {isMobile && <BottomNav onAddExpense={handleAddExpense} />}
      </div>
    </SidebarProvider>
  );
}
