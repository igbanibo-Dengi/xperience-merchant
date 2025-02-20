interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  if (steps.length === 0 || currentStep < 0 || currentStep >= steps.length) {
    console.error('Invalid steps or currentStep value.')
    return null
  }

  return (
    <div className="mx-auto mb-8 w-full max-w-3xl">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step}
            className="relative flex flex-col items-center"
            aria-current={index === currentStep ? 'step' : undefined}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              <span
                className={`block h-2 w-2 rounded-full bg-current`}
                aria-hidden="true"
              />
            </div>
            <span
              className={`mt-2 text-sm ${index <= currentStep ? 'text-primary-foreground' : 'text-muted-foreground'}`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[50%] top-4 h-[2px] w-full translate-x-[-50%] ${index < currentStep ? 'bg-primary' : 'bg-muted'}`}
                style={{ width: `calc(100% + 2rem)` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
