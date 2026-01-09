import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tips } from "@/lib/data";
import { Lightbulb } from "lucide-react";

export function TipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Financial Tips
        </CardTitle>
        <CardDescription>Simple nudges to help you save.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip) => (
            <li key={tip.id} className="flex items-start gap-3">
              <div className="mt-1">
                <tip.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{tip.text}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
