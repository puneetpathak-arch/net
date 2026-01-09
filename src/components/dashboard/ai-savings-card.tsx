
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function AiSavingsCard() {
  return (
    <Card className="col-span-1 lg:col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Savings Helper
        </CardTitle>
        <CardDescription>
          Get personalized savings suggestions based on your spending habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="text-center">
            <p className="text-muted-foreground mb-4">Let our AI find hidden savings for you!</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/savings">
            <Sparkles className="mr-2 h-4 w-4" />
            Get My Smart Tips
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
