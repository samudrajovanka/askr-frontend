import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Stepper, type StepperProps } from "../ui/stepper";

type StepperLayoutProps = {
  stepper: Pick<StepperProps, "steps" | "className">;
  step?: number;
  onStepChange?: (step: number) => void;
  nextText?: string;
  isLoadingNext?: boolean;
  loadingText?: string;
  disableNext?: boolean;
  withLastStepAction?: boolean;
  handleLastAction?: () => void;
  onNext?: (nextStep: number) => void;
  onBack?: (prevStep: number) => void;
  leftHeaderComponent?: React.ReactNode;
  rightHeaderComponent?: React.ReactNode;
  children: (currentStep: number) => React.ReactNode;
};

const StepperLayout = ({
  stepper,
  step: controlledStep,
  onStepChange,
  isLoadingNext,
  nextText = "Next",
  loadingText = "Loading...",
  disableNext,
  withLastStepAction,
  handleLastAction,
  onNext,
  onBack,
  leftHeaderComponent,
  rightHeaderComponent,
  children,
}: StepperLayoutProps) => {
  const [internalStep, setInternalStep] = useState(1);
  const step = controlledStep ?? internalStep;

  const setStep = (newStep: number) => {
    if (controlledStep !== undefined) {
      onStepChange?.(newStep);
    } else {
      setInternalStep(newStep);
    }
  };

  const handleNext = () => {
    if (step === stepper.steps.length) {
      handleLastAction?.();
    } else {
      const nextStep = step + 1;
      onNext ? onNext(nextStep) : setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack?.(0);
      return;
    }
    const prevStep = step - 1;
    onBack ? onBack(prevStep) : setStep(prevStep);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-10 border-b bg-background py-4 grid grid-cols-3">
        <div className="justify-self-start">{leftHeaderComponent}</div>
        <Stepper {...stepper} currentStep={step} />
        <div className="justify-self-end">{rightHeaderComponent}</div>
      </div>

      <div className="py-6">{children(step)}</div>

      <div className="sticky bottom-0 z-10 border-t bg-background py-4">
        <div className="mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={isLoadingNext}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < stepper.steps.length || withLastStepAction ? (
            <Button
              onClick={handleNext}
              disabled={isLoadingNext || disableNext}
              className="ml-auto"
            >
              {isLoadingNext ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {loadingText}
                </>
              ) : (
                nextText
              )}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default StepperLayout;
