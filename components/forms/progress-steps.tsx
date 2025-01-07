interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  if (steps.length === 0 || currentStep < 0 || currentStep >= steps.length) {
    console.error("Invalid steps or currentStep value.");
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex flex-col items-center relative"
            aria-current={index === currentStep ? "step" : undefined}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <span
                className={`block w-2 h-2 rounded-full bg-current`}
                aria-hidden="true"
              />
            </div>
            <span
              className={`mt-2 text-sm ${index <= currentStep ? "text-primary-foreground" : "text-muted-foreground"}`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-4 left-[50%] translate-x-[-50%] w-full h-[2px]
                  ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                style={{ width: `calc(100% + 2rem)` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
