import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SymptomCardProps {
  id: string;
  label: string;
  icon: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function SymptomCard({ id, label, icon, selected, onToggle }: SymptomCardProps) {
  return (
    <Card
      onClick={() => onToggle(id)}
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-md relative",
        selected && "border-primary bg-primary/5"
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div className="flex flex-col items-center text-center gap-2">
        <span className="text-3xl">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Card>
  );
}
