
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function QuickStatCard({ icon: Icon, label, value, className }: QuickStatCardProps) {
  const gradients = {
    "text-indigo-600": {
      bg: "from-indigo-50 to-purple-50",
      icon: "from-indigo-500 via-purple-500 to-pink-500",
    },
    "text-pink-600": {
      bg: "from-pink-50 to-orange-50",
      icon: "from-pink-500 via-rose-500 to-orange-500",
    },
     "text-green-600": {
      bg: "from-green-50 to-emerald-50",
      icon: "from-green-500 to-emerald-600",
    },
  }
  const gradient = gradients[className as keyof typeof gradients] || gradients["text-indigo-600"];

  return (
    <div className={cn("bg-white/90 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-indigo-200/50 hover:shadow-2xl hover:border-indigo-300/70 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group", className)}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity", gradient.bg)}></div>
        <div className="relative z-10 flex items-center gap-4">
            <div className={cn("w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", gradient.icon)}>
                <Icon className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
                <p className="text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wide">{label}</p>
                <p className={cn("text-2xl md:text-4xl font-bold", className)}>{value}</p>
            </div>
        </div>
    </div>
  );
}
