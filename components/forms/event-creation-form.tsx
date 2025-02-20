'use client'

import { useState } from 'react'
import { ProgressSteps } from './progress-steps'
import { EventDetailsStep } from './event-details-step'
import { PhotoUploadStep } from './photo-upload-step'
import { ExperienceMomentsStep } from './experience-moments-step'
import { ReviewStep } from './review-step'
import type { EventFormValues } from '@/lib/schema'
import EventSuucess from './event-suucess'

const steps = [
  'Event Details',
  'Add Photos',
  'Set Experience Moments',
  'Review Content',
]

const initialFormState: EventFormValues = {
  details: {
    name: '',
    description: '',
    venue: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  },
  photos: {
    coverPhoto: new File([], 'cover.jpg'),
    feedPhotos: [],
  },
  experienceMoments: {
    enabled: false,
    moments: [],
  },
}
export function EventCreationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<EventFormValues>(initialFormState)
  const [success, setSuccess] = useState(false)

  const handleNext = (stepData: Partial<EventFormValues>) => {
    setFormData((prev) => {
      // Deep merge the new data with the existing data
      const newData = { ...prev }

      if (stepData.details) {
        newData.details = stepData.details
      }
      if (stepData.photos) {
        newData.photos = stepData.photos
      }
      if (stepData.experienceMoments) {
        newData.experienceMoments = stepData.experienceMoments
      }

      return newData
    })
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleEdit = (step: string) => {
    switch (step) {
      case 'details':
        setCurrentStep(0)
        break
      case 'photos':
        setCurrentStep(1)
        break
      case 'experienceMoments':
        setCurrentStep(2)
        break
      case 'success':
        setCurrentStep(3)
        break
    }
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)
    alert('Event created successfully!')
    setSuccess(true)
  }

  return (
    <>
      {success ? (
        <EventSuucess />
      ) : (
        <div className="container mx-auto">
          {/* <ProgressSteps steps={steps} currentStep={currentStep} /> */}
          {currentStep === 0 && (
            <EventDetailsStep
              defaultValues={formData.details}
              onSubmit={(data) => handleNext({ details: data })}
            />
          )}
          {currentStep === 1 && (
            <PhotoUploadStep
              defaultValues={formData.photos}
              onSubmit={(data) => handleNext({ photos: data.photos })}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <ExperienceMomentsStep
              defaultValues={formData.experienceMoments}
              onSubmit={(data) =>
                handleNext({ experienceMoments: data.experienceMoments })
              }
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ReviewStep
              eventData={formData}
              onSubmit={handleSubmit}
              onBack={handleBack}
              onEdit={handleEdit}
            />
          )}
          {currentStep === 4 && <EventSuucess />}
        </div>
      )}
    </>
  )
}
