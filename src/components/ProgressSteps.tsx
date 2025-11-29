import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  step.completed && "bg-primary border-primary",
                  step.current && "border-primary bg-primary/10",
                  !step.completed && !step.current && "border-border bg-card"
                )}
              >
                {step.completed ? (
                  <Check className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    step.current && "text-primary"
                  )}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-2 hidden sm:block",
                step.current && "text-foreground font-medium",
                !step.current && "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 transition-all",
                  step.completed ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
