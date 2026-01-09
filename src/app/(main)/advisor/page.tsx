
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Loader2, Send, User as UserIcon, Wallet, Target, IndianRupee } from 'lucide-react';
import { useUser } from '@/firebase';
import { getExpenses, getBudget, getGoals } from '@/services/firestore';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface FinancialContext {
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsGoalsJSON: string;
    recentTransactionsJSON: string;
}

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg", color)}>
        <Icon className="w-6 h-6" />
        <div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-foreground/80">{value}</p>
        </div>
    </div>
);


export default function AdvisorPage() {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [financialContext, setFinancialContext] = useState<FinancialContext | null>(null);
    const [dataLoading, setDataLoading] = useState(true);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setDataLoading(true);
        try {
            const [rawExpenses, budget, rawGoals] = await Promise.all([
                getExpenses(user.uid),
                getBudget(user.uid),
                getGoals(user.uid),
            ]);
            
            const totalSpent = rawExpenses.reduce((sum, exp) => sum + exp.amount, 0);

            setFinancialContext({
                monthlyIncome: budget?.total ?? 0,
                monthlyExpenses: totalSpent,
                savingsGoalsJSON: JSON.stringify(rawGoals),
                recentTransactionsJSON: JSON.stringify(rawExpenses.slice(0, 10)),
            });
        } catch (error) {
            console.error("Error fetching financial context:", error);
        } finally {
            setDataLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !financialContext) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('/api/financial-advice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: input,
                    ...financialContext,
                }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const advice: { response: string } = await response.json();
            const assistantMessage: Message = { role: 'assistant', content: advice.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error getting financial advice:", error);
            const errorMessage: Message = { role: 'assistant', content: "Sorry, I couldn't get any advice right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
            {/* Financial Context Section */}
            <Card className="lg:col-span-1 hidden lg:flex flex-col animate-fade-in-up">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wallet className="w-6 h-6" /> Your Financial Snapshot
                    </CardTitle>
                    <CardDescription>The AI uses this context to give you personalized advice.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {dataLoading ? (
                        <>
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                        </>
                    ) : (
                        <>
                           <StatCard icon={IndianRupee} label="Monthly Income" value={`₹${financialContext?.monthlyIncome.toLocaleString()}`} color="bg-green-100 text-green-800" />
                           <StatCard icon={IndianRupee} label="Total Monthly Expenses" value={`₹${financialContext?.monthlyExpenses.toLocaleString()}`} color="bg-red-100 text-red-800" />
                           <StatCard icon={Target} label="Active Savings Goals" value={JSON.parse(financialContext?.savingsGoalsJSON || '[]').length.toString() ?? '0'} color="bg-blue-100 text-blue-800" />
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Chat Section */}
            <Card className="lg:col-span-2 flex flex-col h-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="w-6 h-6 text-primary" />
                        AI Financial Advisor
                    </CardTitle>
                    <CardDescription>Ask me anything about your finances!</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
                    <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
                        <div className="space-y-4">
                             <div className="flex items-start gap-3">
                                <Avatar className="h-9 w-9 border-2 border-primary">
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-md">
                                    <p className="text-sm">Hello! I'm your personal financial advisor. How can I help you manage your money today?</p>
                                </div>
                            </div>
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' && 'justify-end')}>
                                    {message.role === 'assistant' && (
                                        <Avatar className="h-9 w-9 border-2 border-primary">
                                            <AvatarFallback><Bot /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn(
                                        "p-3 rounded-lg max-w-md",
                                        message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-tl-none'
                                    )}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user?.photoURL || ''} />
                                            <AvatarFallback><UserIcon /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-9 w-9 border-2 border-primary">
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-md">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-4 border-t">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., How can I save more on food?"
                            disabled={loading || dataLoading}
                        />
                        <Button type="submit" disabled={loading || !input.trim() || dataLoading}>
                            <Send className="w-4 h-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
