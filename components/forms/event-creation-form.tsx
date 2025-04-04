'use client'

import { useState } from 'react'
import { ProgressSteps } from './progress-steps'
import { EventDetailsStep } from './event-details-step'
import { PhotoUploadStep } from './photo-upload-step'
import { ExperienceMomentsStep } from './experience-moments-step'
import { ReviewStep } from './review-step'
import type { EventData } from '@/types/event'
import { EventSuccess } from './event-suucess'
import { uploadMultipleImages } from '@/lib/actions/upload-multiple-images'
import { uploadImage } from '@/lib/actions/uploadImage'
import { getUserPlan } from '@/lib/actions/plans/plans.actions'
import { createEvent } from '@/lib/actions/events/createEvent'

const steps = [
  'Event Details',
  'Add Photos',
  'Set Experience Moments',
  'Review Content',
]

const initialFormState: EventData = {
  eventDetails: {
    title: '',
    description: '',
    location: {
      type: 'Physical',
      venueName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
    hashtags: [],
    planId: '',
  },
  eventImages: {
    coverPhoto: null,
    sampleFeedPhotos: [],
  },
  experienceMoments: {
    active: false,
    recurrence: '',
    duration: '',
  },
}

export function EventCreationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<EventData>(initialFormState)
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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
      case 'details':
        setCurrentStep(0)
        break
      case 'photos':
        setCurrentStep(1)
        break
      case 'experienceMoments':
        setCurrentStep(2)
        break
      default:
        break
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)

    console.log('submission started')

    // Get the user's plan
    const plan = await getUserPlan()
    const userPlanId = plan.data[0]._id

    console.log(userPlanId)

    // Create a copy of formData
    const formDataCopy = { ...formData }

    // Upload cover photo if it exists
    if (formData.eventImages.coverPhoto) {
      const imageFormData = new FormData()
      imageFormData.append('image', formData.eventImages.coverPhoto)

      try {
        const response = await uploadImage(imageFormData)
        // console.log("Cover Photo Response:", response);

        if (response.success && response.data) {
          formDataCopy.eventImages.coverPhotoUrl = response.data.mediaUrl
        }
      } catch (error) {
        console.error('Error uploading cover photo:', error)
      }
    }

    // Upload multiple sample feed photos if they exist
    if (formData.eventImages.sampleFeedPhotos?.length) {
      const multipleImageFormData = new FormData()
      formData.eventImages.sampleFeedPhotos.forEach((file) =>
        multipleImageFormData.append('images', file)
      )

      try {
        const response = await uploadMultipleImages(multipleImageFormData)
        // console.log("Multiple Upload Response:", response);

        if (response.success && response.data) {
          formDataCopy.eventImages.sampleFeedPhotosUrls = response.data.mediaUrl
        }
      } catch (error) {
        console.error('Error uploading sample feed photos:', error)
      }
    }

    // Restructure `formDataCopy` to match the expected API format
    const formattedData = {
      title: formDataCopy.eventDetails.title,
      description: formDataCopy.eventDetails.description,
      location: formDataCopy.eventDetails.location,
      eventDate: formDataCopy.eventDetails.eventDate,
      eventStartTime: formDataCopy.eventDetails.eventStartTime,
      eventEndTime: formDataCopy.eventDetails.eventEndTime,
      hashtags: formDataCopy.eventDetails.hashtags,
      xperienceMoment: {
        active: formDataCopy.experienceMoments.active,
        recurrence: formDataCopy.experienceMoments.recurrence,
        duration: formDataCopy.experienceMoments.duration,
      },
      planId: userPlanId,
      coverPhotoUrl: formDataCopy.eventImages.coverPhotoUrl || '',
      sampleFeedPhotosUrl: formDataCopy.eventImages.sampleFeedPhotosUrls || [],
    }

    console.log('Formatted Data:', formattedData)

    try {
      const result = await createEvent(formattedData)

      if (result.success) {
        console.log('Event created successfully:', result.data)
        setSuccess(true)
        setSubmitting(false)
      } else {
        console.error('Failed to create event:', result.message)
        // Todo: Add error state and display to user
      }
    } catch (error) {
      console.error('Error submitting event:', error)
    }
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
              submitting={submitting}
              onBack={handleBack}
              onEdit={handleEdit}
            />
          )}
        </div>
      )}
    </>
  )
}
