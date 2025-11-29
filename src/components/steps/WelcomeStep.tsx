import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, AlertTriangle, Info } from "lucide-react";

interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <Heart className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Acarbose Hypoglycemia Triage
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A friendly guide to help you decide if you need to see a GP or visit the Emergency Department
        </p>
      </div>

      <Card className="border-info/20 bg-info/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-info">
            <Info className="w-5 h-5" />
            Are you taking acarbose?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This tool is specifically designed for patients taking acarbose who are experiencing symptoms of low blood sugar (hypoglycemia).
          </p>
          <p className="text-sm text-muted-foreground">
            Acarbose works differently than other diabetes medications, and treating its side effects requires special consideration.
          </p>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            Important Safety Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">This tool does not replace medical advice.</strong> It helps you decide where to seek care based on your symptoms.
          </p>
          <p>
            If you're unsure or symptoms are worsening, always err on the side of caution and seek immediate medical attention.
          </p>
          <p className="text-xs pt-2 border-t border-warning/20 text-warning">
            ⚠️ If you're experiencing a medical emergency, call for help immediately.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4">
        <Button size="lg" onClick={onStart} className="min-w-[200px]">
          Start Assessment
        </Button>
      </div>
    </div>
  );
}
