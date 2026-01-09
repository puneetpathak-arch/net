
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bell, AlertTriangle, BadgePercent, Trophy, LogOut } from "lucide-react";
import type { Notification } from "@/lib/types";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface UserNavProps {
    onBudget: boolean;
}

const iconMap: { [key in Notification['type']]: React.ElementType } = {
  "budget-warning": AlertTriangle,
  "budget-over": AlertTriangle,
  "new-tip": BadgePercent,
  "goal-achieved": Trophy,
};

const colorMap: { [key in Notification['type']]: string } = {
    "budget-warning": "text-orange-500", // Warning
    "budget-over": "text-red-500",       // Error
    "new-tip": "text-blue-500",          // Info
    "goal-achieved": "text-green-500",     // Success
}


function NotificationsDropdown() {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label={`View notifications (${unreadCount} unread)`}>
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" aria-hidden="true"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Notifications</p>
                        {unreadCount > 0 && (
                            <span className="text-xs text-primary font-bold">{unreadCount} New</span>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(notification => {
                            const Icon = iconMap[notification.type];
                            return (
                                <DropdownMenuItem key={notification.id} className="flex items-start gap-3 data-[highlighted]:bg-accent/80" style={{opacity: notification.read ? 0.6 : 1}}>
                                    <Icon className={cn("mt-1 h-5 w-5 shrink-0", colorMap[notification.type])} aria-hidden="true"/>
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium whitespace-normal">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground whitespace-normal">{notification.description}</p>
                                    </div>
                                </DropdownMenuItem>
                            )
                        })
                    ) : (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                            All caught up! 🎉
                        </div>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                   <button className="text-xs text-muted-foreground hover:text-primary">Mark all as read</button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function UserNav({ onBudget }: UserNavProps) {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/');
    }
  };

  const userInitial = user?.displayName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2">
        <NotificationsDropdown />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="Open user menu">
            <Avatar className={cn("h-9 w-9", onBudget && "ring-2 ring-green-500 ring-offset-2 ring-offset-background")}>
                <AvatarImage src={user?.photoURL || undefined} alt={`@${user?.displayName}`} />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                <Link href="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full">Settings</Link>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
