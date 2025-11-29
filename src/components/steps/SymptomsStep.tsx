import { Button } from "@/components/ui/button";
import { SymptomCard } from "@/components/SymptomCard";
import { Symptom } from "@/types/assessment";

interface SymptomsStepProps {
  selectedSymptoms: string[];
  onToggleSymptom: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const symptoms: Symptom[] = [
  { id: "sweating", label: "Sweating", severity: "mild", icon: "💧" },
  { id: "tremor", label: "Shaking/Trembling", severity: "mild", icon: "🤲" },
  { id: "hunger", label: "Extreme Hunger", severity: "mild", icon: "🍽️" },
  { id: "palpitations", label: "Fast Heartbeat", severity: "moderate", icon: "💓" },
  { id: "dizziness", label: "Dizziness", severity: "moderate", icon: "😵" },
  { id: "blurredVision", label: "Blurred Vision", severity: "moderate", icon: "👁️" },
  { id: "confusion", label: "Confusion", severity: "severe", icon: "🤔" },
  { id: "irritability", label: "Irritability", severity: "moderate", icon: "😠" },
  { id: "weakness", label: "Weakness", severity: "moderate", icon: "😓" },
  { id: "slurredSpeech", label: "Slurred Speech", severity: "severe", icon: "🗣️" },
  { id: "seizure", label: "Seizure", severity: "severe", icon: "⚡" },
  { id: "lossOfConsciousness", label: "Passed Out", severity: "severe", icon: "😴" },
];

export function SymptomsStep({
  selectedSymptoms,
  onToggleSymptom,
  onNext,
  onBack,
}: SymptomsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">What symptoms are you experiencing?</h2>
        <p className="text-muted-foreground">Select all that apply</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {symptoms.map((symptom) => (
          <SymptomCard
            key={symptom.id}
            id={symptom.id}
            label={symptom.label}
            icon={symptom.icon}
            selected={selectedSymptoms.includes(symptom.id)}
            onToggle={onToggleSymptom}
          />
        ))}
      </div>

      <div className="flex gap-4 justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={selectedSymptoms.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
