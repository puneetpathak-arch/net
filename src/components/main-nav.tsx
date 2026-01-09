
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BarChartHorizontal, GraduationCap, LayoutDashboard, User, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

export const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analytics", icon: BarChartHorizontal, label: "Analytics" },
  { href: "/savings", icon: Sparkles, label: "AI Savings" },
  { href: "/goals", icon: Target, label: "Goals" },
  { href: "/advisor", icon: Bot, label: "AI Advisor" },
  { href: "/scholarships", icon: GraduationCap, label: "Scholarships" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function MainNav({ onNavItemClick }: { onNavItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const isActive = (item.href === '/dashboard' && pathname === item.href) || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        return (
          <SidebarMenuItem key={item.href}>
             <Link href={item.href}>
                <SidebarMenuButton
                    onClick={onNavItemClick}
                    isActive={isActive}
                    className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                    isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                        : 'text-gray-400 hover:bg-slate-800/50 hover:text-white'
                    )}
                    tooltip={item.label}
                >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
