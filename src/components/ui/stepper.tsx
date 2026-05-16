import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepperStep = {
  label: string;
};

export type StepperProps = {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
};

const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div className={cn("flex items-start", className)}>
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div
            key={step.label}
            className="w-32 flex flex-col items-center gap-1"
          >
            <div className="grid place-content-center relative w-full">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border-2 typography-small font-semibold transition-colors",
                  isDone || isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-background text-muted-foreground",
                )}
              >
                {isDone ? <Check className="size-4" /> : stepNum}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-0.5 w-1/2 transition-colors",
                    stepNum < currentStep
                      ? "bg-primary"
                      : "bg-muted-foreground/20",
                  )}
                />
              )}
            </div>

            <span
              className={cn(
                "typography-small font-medium text-center inline-block w-11/12",
                isActive ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { Stepper };
