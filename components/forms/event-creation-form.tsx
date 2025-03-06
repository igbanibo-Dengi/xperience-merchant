"use client"

import { useState } from "react"
import { ProgressSteps } from "./progress-steps"
import { EventDetailsStep } from "./event-details-step"
import { PhotoUploadStep } from "./photo-upload-step"
import { ExperienceMomentsStep } from "./experience-moments-step"
import { ReviewStep } from "./review-step"
import type { EventData } from "@/types/event"
import { EventSuccess } from "./event-suucess"

const steps = ["Event Details", "Add Photos", "Set Experience Moments", "Review Content"]

const initialFormState: EventData = {
  eventDetails: {
    title: "",
    description: "",
    location: {
      type: "Physical",
      venueName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    eventStartDay: "",
    eventEndDay: "",
    eventStartTime: "",
    eventEndTime: "",
  },
  eventImages: {
    coverPhotoUrl: null,
    sampleFeedPhotosUrl: [],
  },
  experienceMoments: {
    active: false,
    recurrence: "",
    duration: "",
  },
}

export function EventCreationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<EventData>(initialFormState)
  const [success, setSuccess] = useState(false)

  const handleNext = (stepData: Partial<EventData>) => {
    setFormData((prev) => {
      // Deep merge the new data with the existing data
      const newData = { ...prev }

      if (stepData.eventDetails) {
        newData.eventDetails = stepData.eventDetails
      }
      if (stepData.eventImages) {
        newData.eventImages = stepData.eventImages
      }
      if (stepData.experienceMoments) {
        newData.experienceMoments = stepData.experienceMoments
      }

      return newData
    })
    setCurrentStep((prev) => Math.min(prev + 1, steps.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleEdit = (step: string) => {
    switch (step) {
      case "details":
        setCurrentStep(0)
        break
      case "photos":
        setCurrentStep(1)
        break
      case "experienceMoments":
        setCurrentStep(2)
        break
      default:
        break
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // setSuccess(true)
  }

  return (
    <>
      {success ? (
        <EventSuccess />
      ) : (
        <div className="container mx-auto pb-20">
          <ProgressSteps steps={steps} currentStep={currentStep} />
          {currentStep === 0 && (
            <EventDetailsStep
              defaultValues={formData.eventDetails}
              onSubmit={(data) => handleNext({ eventDetails: data })}
            />
          )}
          {currentStep === 1 && (
            <PhotoUploadStep
              defaultValues={formData.eventImages}
              onSubmit={(data) => handleNext({ eventImages: data.photos })}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <ExperienceMomentsStep
              defaultValues={formData.experienceMoments}
              onSubmit={(data) => handleNext({ experienceMoments: data.experienceMoments })}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ReviewStep eventData={formData} onSubmit={handleSubmit} onBack={handleBack} onEdit={handleEdit} />
          )}
        </div>
      )}
    </>
  )
}

