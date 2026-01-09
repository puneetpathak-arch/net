
'use client';

import { UserNav } from "@/components/user-nav";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardHeader() {
  const isMobile = useIsMobile();
  const onBudget = true; // This should be calculated based on real data

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 justify-between">
      {isMobile ? <SidebarTrigger /> : <div />}
      
      <div className="flex items-center justify-end">
        <UserNav onBudget={onBudget} />
      </div>
    </header>
  );
}
