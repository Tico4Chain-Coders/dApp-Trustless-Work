"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { StepButton } from "./StepButton";
import { StepContent } from "./StepContent";
import { useEscrowStepsStore } from "@/store/EscrowStepStore/store";
import { Card, CardContent } from "@/components/ui/card";

export interface StepItem {
  title: string;
  description?: string;
  component: React.ReactNode;
}

export interface EscrowStepsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StepItem[];
}

export const EscrowSteps = React.forwardRef<HTMLDivElement, EscrowStepsProps>(
  ({ items, className, ...props }, ref) => {
    const { currentStep, setTotalSteps, toggleStep, isStepCompleted } =
      useEscrowStepsStore();

    React.useEffect(() => {
      setTotalSteps(items.length);
    }, [items.length, setTotalSteps]);

    const handleStepToggle = React.useCallback(
      (stepNumber: number) => {
        toggleStep(stepNumber);
      },
      [toggleStep],
    );

    const currentComponent = React.useMemo(
      () => items[currentStep - 1]?.component,
      [items, currentStep],
    );

    return (
      <div
        ref={ref}
        className={cn("flex flex-col md:flex-row gap-6", className)}
        {...props}
      >
        <Card className={cn("overflow-hidden md:w-1/3 w-full h-auto")}>
          <CardContent className="p-6 space-y-4">
            {items.map((step: StepItem, index: number) => {
              const stepNumber: number = index + 1;
              const isActive: boolean = stepNumber === currentStep;
              const isCompleted: boolean = isStepCompleted(stepNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    "relative flex items-start gap-3",
                    "before:absolute before:left-5 before:top-[2.9rem] before:h-[calc(100%-2rem)] before:w-[2px]",
                    isCompleted
                      ? "before:bg-blue-500"
                      : "before:bg-zinc-200 dark:before:bg-zinc-800",
                    index === items.length - 1 ? "before:hidden" : "",
                  )}
                >
                  <StepButton
                    number={stepNumber}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    onClick={() => handleStepToggle(stepNumber)}
                  />

                  <div className="flex-1">
                    <StepContent step={step} isActive={isActive} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className={cn("overflow-hidden md:w-4/6 w-full h-auto")}>
          <CardContent className="p-6 space-y-4">
            <div
              className="rounded-lg p-6 transition-all duration-200"
              key={currentStep}
            >
              {currentComponent}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

EscrowSteps.displayName = "EscrowSteps";