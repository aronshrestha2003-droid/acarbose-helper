import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

interface RedFlagsStepProps {
  canSwallow: boolean;
  mentalStatus: "alert" | "confused" | "unresponsive";
  redFlags: string[];
  onCanSwallowChange: (value: boolean) => void;
  onMentalStatusChange: (value: "alert" | "confused" | "unresponsive") => void;
  onRedFlagToggle: (flag: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const redFlagOptions = [
  { id: "seizure", label: "Had a seizure" },
  { id: "pregnant", label: "Currently pregnant" },
  { id: "alone", label: "Home alone with worsening symptoms" },
  { id: "kidney", label: "Have kidney disease" },
  { id: "liver", label: "Have liver disease" },
  { id: "repeated", label: "Multiple episodes today" },
  { id: "noImprovement", label: "No improvement after taking glucose" },
];

export function RedFlagsStep({
  canSwallow,
  mentalStatus,
  redFlags,
  onCanSwallowChange,
  onMentalStatusChange,
  onRedFlagToggle,
  onNext,
  onBack,
}: RedFlagsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Critical Safety Questions</h2>
        <p className="text-muted-foreground">These help us determine urgency</p>
      </div>

      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            Mental Awareness
          </CardTitle>
          <CardDescription>How alert are you right now?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={mentalStatus} onValueChange={onMentalStatusChange as any}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alert" id="alert" />
              <Label htmlFor="alert" className="cursor-pointer">
                Fully alert and aware
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="confused" id="confused" />
              <Label htmlFor="confused" className="cursor-pointer">
                Confused or disoriented
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unresponsive" id="unresponsive" />
              <Label htmlFor="unresponsive" className="cursor-pointer">
                Difficulty staying awake
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-5 h-5" />
            Ability to Take Treatment
          </CardTitle>
          <CardDescription>Can you safely swallow glucose tablets or juice?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={canSwallow ? "yes" : "no"} onValueChange={(v) => onCanSwallowChange(v === "yes")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="swallow-yes" />
              <Label htmlFor="swallow-yes" className="cursor-pointer">
                Yes, I can swallow safely
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="swallow-no" />
              <Label htmlFor="swallow-no" className="cursor-pointer">
                No, I'm having difficulty swallowing
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warning Signs</CardTitle>
          <CardDescription>Check any that apply to you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {redFlagOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={redFlags.includes(option.id)}
                onCheckedChange={() => onRedFlagToggle(option.id)}
              />
              <Label htmlFor={option.id} className="cursor-pointer text-sm">
                {option.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Get Results
        </Button>
      </div>
    </div>
  );
}
