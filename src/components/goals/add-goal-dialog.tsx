
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { Laptop, Car, Gift, Headphones, Plane, PiggyBank, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Goal } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

export const goalIcons: { name: string; icon: LucideIcon }[] = [
  { name: 'Laptop', icon: Laptop },
  { name: 'Car', icon: Car },
  { name: 'Gift', icon: Gift },
  { name: 'Headphones', icon: Headphones },
  { name: 'Plane', icon: Plane },
  { name: 'PiggyBank', icon: PiggyBank },
  { name: 'BookOpen', icon: BookOpen },
];

interface AddGoalDialogProps {
    onAddGoal: (newGoal: Omit<Goal, 'id' | 'savedAmount' | 'color' | 'icon'> & { icon: string; }) => Promise<void>;
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    initialData?: Partial<Omit<Goal, 'id' | 'savedAmount' | 'color'>>;
}

export function AddGoalDialog({ onAddGoal, children, open: controlledOpen, onOpenChange, initialData }: AddGoalDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedIconName, setSelectedIconName] = useState('Laptop');
  const { toast } = useToast();

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  useEffect(() => {
    if (open && initialData) {
        setGoalName(initialData.name || '');
        setTargetAmount(initialData.targetAmount?.toString() || '');
        setDeadline(initialData.deadline ? format(parseISO(initialData.deadline), 'yyyy-MM-dd') : '');
        const iconName = goalIcons.find(i => i.icon === initialData.icon)?.name || 'Laptop';
        setSelectedIconName(iconName);
    }
  }, [open, initialData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !deadline) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields to create a goal.',
      });
      return;
    }

    await onAddGoal({
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      deadline: new Date(deadline).toISOString(),
      icon: selectedIconName,
    });

    // Reset form and close dialog
    setGoalName('');
    setTargetAmount('');
    setDeadline('');
    setSelectedIconName('Laptop');
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent 
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-radix-popper-content-wrapper]')) {
                e.preventDefault();
            }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create a New Savings Goal</DialogTitle>
          <DialogDescription>
            What are you saving for? Let's make a plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-name" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="goal-name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., New Laptop"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target-amount" className="text-right">
                  Target (₹)
                </Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="e.g., 50000"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="col-span-3"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                 <Label className="text-right pt-2">
                  Icon
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                    {goalIcons.map(({name, icon: Icon}) => {
                        const isSelected = selectedIconName === name;
                        return (
                             <Button
                                key={name}
                                type="button"
                                variant={isSelected ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => setSelectedIconName(name)}
                                aria-label={name}
                                className="h-12 w-12"
                            >
                                <Icon className="h-6 w-6" />
                            </Button>
                        )
                    })}
                </div>
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                     <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Goal</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
