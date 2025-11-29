import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface GlucoseStepProps {
  glucoseReading?: number;
  lastMealTime?: string;
  onGlucoseChange: (value: number | undefined) => void;
  onMealTimeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GlucoseStep({
  glucoseReading,
  lastMealTime,
  onGlucoseChange,
  onMealTimeChange,
  onNext,
  onBack,
}: GlucoseStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Blood Sugar Information</h2>
        <p className="text-muted-foreground">Help us understand your current state</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Blood Sugar Reading</CardTitle>
          <CardDescription>If you've checked your glucose recently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
            <Input
              id="glucose"
              type="number"
              placeholder="e.g., 75"
              value={glucoseReading || ""}
              onChange={(e) => onGlucoseChange(e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          <Card className="border-info/20 bg-info/5">
            <CardContent className="pt-4">
              <div className="flex gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
                <div>
                  <p className="mb-2">Normal range is typically 70-100 mg/dL when fasting.</p>
                  <p>If you haven't checked, you can skip this and continue.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When did you last eat?</CardTitle>
          <CardDescription>Approximate time helps us assess the situation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealTime">Last Meal Time</Label>
            <Input
              id="mealTime"
              type="time"
              value={lastMealTime || ""}
              onChange={(e) => onMealTimeChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
