
'use client';

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Edit, Wallet, Bell, LogOut, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { Budget, UserProfile } from "@/lib/types";
import { signOut } from "firebase/auth";
import { useAuth } from "@/firebase";
import { useRouter } from "next/navigation";
import { getUserDocument, updateUserProfile, updateBudget } from "@/services/firestore";
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';


export default function ProfilePage() {
    const { user, loading: userLoading } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile>({ displayName: '', college: '' });
    const [budget, setBudget] = useState<Budget | null>(null);
    const [budgetAmount, setBudgetAmount] = useState(15000);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const fetchProfileData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const userDoc = await getUserDocument(user.uid);
            if (userDoc) {
                setProfile({
                    displayName: userDoc.displayName || user.displayName || '',
                    college: userDoc.college || ''
                });
                if (userDoc.budget) {
                    setBudget(userDoc.budget);
                    setBudgetAmount(userDoc.budget.total);
                }
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Could not load your profile data.'
            });
        } finally {
            setLoading(false);
        }
    }, [user, toast]);

    useEffect(() => {
        if (user) {
            fetchProfileData();
        } else if (!userLoading) {
            setLoading(false);
        }
    }, [user, userLoading, fetchProfileData]);

    const handleSaveChanges = async () => {
        if (!user || !budget) return;
        setSaving(true);
        try {
            const profileUpdatePromise = updateUserProfile(user.uid, {
                displayName: profile.displayName,
                college: profile.college,
            });

            if (auth?.currentUser && auth.currentUser.displayName !== profile.displayName) {
                await updateFirebaseProfile(auth.currentUser, { displayName: profile.displayName });
            }

            const budgetUpdatePromise = budgetAmount !== budget.total
                ? updateBudget(user.uid, { ...budget, total: budgetAmount })
                : Promise.resolve();

            await Promise.all([profileUpdatePromise, budgetUpdatePromise]);

            toast({
                title: "Profile Updated",
                description: "Your changes have been saved successfully.",
            });
        } catch (error) {
            console.error("Error saving profile:", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Could not save your changes.",
            });
        } finally {
            setSaving(false);
        }
    };
    
    const handleLogout = async () => {
      if (auth) {
        await signOut(auth);
        router.push('/');
      }
    };

    if (userLoading || loading) {
        return (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        );
    }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="relative group transition-transform hover:scale-105">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary ring-4 ring-primary/20">
                <AvatarImage src={user?.photoURL || undefined} alt={`@${profile.displayName}`} />
                <AvatarFallback>{profile.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-1 right-1 h-8 w-8 md:h-9 md:w-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit className="w-4 h-4"/>
                <span className="sr-only">Edit profile picture</span>
            </Button>
        </div>
        <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">{profile.displayName}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{profile.college || 'Your College'}</p>
        </div>
      </div>

      <Card className="w-full max-w-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <CardContent className="p-6 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <UserIcon className="w-5 h-5"/>
                    Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                        <Input id="name" value={profile.displayName || ''} onChange={(e) => setProfile(p => ({...p, displayName: e.target.value}))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="college" className="text-sm">College</Label>
                        <Input id="college" value={profile.college || ''} onChange={(e) => setProfile(p => ({...p, college: e.target.value}))} placeholder="e.g. IIT Delhi" />
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-sm">Email</Label>
                        <Input id="email" type="email" value={user?.email || ''} disabled />
                    </div>
                </div>
            </div>

            {/* Budget Settings Section */}
            <div className="space-y-4">
                 <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <Wallet className="w-5 h-5"/>
                    Budget Settings
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="budget" className="text-sm">Default Monthly Budget</Label>
                        <span className="font-bold text-base md:text-lg text-primary">₹{budgetAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                        id="budget"
                        min={5000}
                        max={50000}
                        step={1000}
                        value={[budgetAmount]}
                        onValueChange={(value) => setBudgetAmount(value[0])}
                        aria-label="Default Monthly Budget"
                    />
                </div>
            </div>
            
             {/* Preferences Section */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <Bell className="w-5 h-5"/>
                    Preferences
                </h3>
                 <div className="flex items-center justify-between rounded-lg border p-3 md:p-4">
                    <div>
                        <h4 className="font-medium text-sm md:text-base" id="notifications-label">Notifications</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Receive alerts for budget limits and tips.</p>
                    </div>
                    <Switch defaultChecked aria-labelledby="notifications-label" />
                </div>
            </div>

             <Button size="lg" className="w-full" onClick={handleSaveChanges} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
             </Button>
        </CardContent>
      </Card>
      
      <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <Button variant="outline" className="w-48 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
        </Button>
        <Button variant="link" className="text-muted-foreground text-xs h-auto py-1">Delete Account</Button>
      </div>

    </div>
  );
}

    