"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="mb-8 hidden md:block">
      <div className="relative mx-auto flex max-w-3xl justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-primary bg-background text-primary"
                      : "border-muted-foreground bg-background text-muted-foreground",
                )}
              >
                {isCompleted ? <CheckIcon className="h-5 w-5" /> : <span>{index + 1}</span>}
              </div>
              <span className={cn("mt-2 text-sm", isCurrent ? "font-medium text-foreground" : "text-muted-foreground")}>
                {step}
              </span>
            </div>
          )
        })}

        {/* Progress line */}
        <div className="absolute left-0 top-5 h-0.5 w-full -translate-y-1/2 bg-muted-foreground/30">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

