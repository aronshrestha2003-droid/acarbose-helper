import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TriageResponse } from "@/types/assessment";
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultStepProps {
  result: TriageResponse;
  onRestart: () => void;
}

export function ResultStep({ result, onRestart }: ResultStepProps) {
  const isED = result.result === "ED";
  const urgencyConfig = {
    critical: { icon: AlertCircle, color: "destructive", label: "CRITICAL" },
    high: { icon: AlertTriangle, color: "destructive", label: "URGENT" },
    medium: { icon: AlertTriangle, color: "warning", label: "MODERATE" },
    low: { icon: CheckCircle2, color: "success", label: "ROUTINE" },
  };

  const config = urgencyConfig[result.urgencyLevel];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      <Card className={cn(
        "border-2",
        isED ? "border-destructive bg-destructive/5" : "border-success bg-success/5"
      )}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center",
              isED ? "bg-destructive" : "bg-success"
            )}>
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">
            {isED ? "Go to Emergency Department" : "See Your GP"}
          </CardTitle>
          <CardDescription className="text-base pt-2">
            <span className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium",
              config.color === "destructive" && "bg-destructive/10 text-destructive",
              config.color === "warning" && "bg-warning/10 text-warning",
              config.color === "success" && "bg-success/10 text-success"
            )}>
              {config.label} PRIORITY
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-card rounded-lg border">
            <p className="text-foreground leading-relaxed">{result.reasoning}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            What to do next
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-info/20 bg-info/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-info text-base">
            <Info className="w-5 h-5" />
            Important: Acarbose-Specific Treatment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">
            Remember: Table sugar won't work with acarbose!
          </p>
          <p>
            Acarbose blocks the breakdown of regular table sugar (sucrose). If you need to treat low blood sugar:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use pure glucose tablets or dextrose</li>
            <li>Do NOT use table sugar, candy, or juice</li>
            <li>Honey or milk products also won't work quickly</li>
          </ul>
          <p className="pt-2 text-xs border-t border-info/20 mt-4">
            This is crucial information to share with any healthcare provider treating you.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button onClick={onRestart} variant="outline">
          Start New Assessment
        </Button>
      </div>
    </div>
  );
}
