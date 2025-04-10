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
import { assignPlanToUser, getAllPlans, getPlanById, getUserPlan } from '@/lib/actions/plans/plans.actions'
import { createEvent } from '@/lib/actions/events/createEvent'
import { ToastAction } from '../ui/toast'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'
import { Button } from '../ui/button'
import { basicPlanId } from '@/constants'

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
    console.log('submission started')
    setSubmitting(true)

    let userPlanId: string | null = null

    // Step 1: Get or Assign User Plan
    try {
      const plan = await getUserPlan()

      if (!plan.data || plan.data.length === 0) {
        const assignPlan = await assignPlanToUser(basicPlanId)

        if (!assignPlan.success || !assignPlan.data?._id) {
          console.error('Failed to assign plan to user:', assignPlan.message)
          toast({
            title: 'Error',
            description: 'Could not assign a plan to your account.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
          return
        }

        userPlanId = assignPlan.data._id
      } else {
        userPlanId = plan.data[0]._id
      }
    } catch (error) {
      console.error('Error fetching or assigning plan:', error)
      toast({
        title: 'Error',
        description: 'There was a problem setting up your plan.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }

    // Step 2: Prepare a safe copy of formData
    const formDataCopy = { ...formData }
    formDataCopy.eventImages = formDataCopy.eventImages || {}
    formDataCopy.experienceMoments = formDataCopy.experienceMoments || {}
    formDataCopy.eventDetails = formDataCopy.eventDetails || {}

    // Step 3: Prepare image uploads
    const coverPhoto = formData.eventImages?.coverPhoto
    const sampleFeedPhotos = formData.eventImages?.sampleFeedPhotos || []

    let coverPhotoUrl = ''
    let sampleFeedPhotosUrls: string[] = []

    const coverUploadPromise = coverPhoto
      ? (() => {
        const imageFormData = new FormData()
        imageFormData.append('image', coverPhoto)
        return uploadImage(imageFormData)
      })()
      : Promise.resolve(null)

    const sampleUploadPromise = sampleFeedPhotos.length
      ? (() => {
        const multipleImageFormData = new FormData()
        sampleFeedPhotos.forEach((file) =>
          multipleImageFormData.append('images', file)
        )
        return uploadMultipleImages(multipleImageFormData)
      })()
      : Promise.resolve(null)

    try {
      const [coverResponse, multipleResponse] = await Promise.all([
        coverUploadPromise,
        sampleUploadPromise,
      ])

      if (coverResponse?.success && coverResponse.data) {
        coverPhotoUrl = coverResponse.data.mediaUrl
      }

      if (multipleResponse?.success && multipleResponse.data) {
        sampleFeedPhotosUrls = multipleResponse.data.mediaUrl
      }
    } catch (error) {
      console.error('Error uploading one or more images:', error)
      toast({
        title: 'Upload Error',
        description: 'There was an issue uploading your images. Please try again.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }

    // Step 4: Prepare data for submission
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
      planId: userPlanId!,
      coverPhotoUrl,
      sampleFeedPhotosUrl: sampleFeedPhotosUrls,
    }

    console.log('Formatted Data:', formattedData)

    // Step 5: Submit event
    try {
      const result = await createEvent(formattedData)

      if (result.success) {
        console.log('Event created successfully:', result.data)
        toast({
          title: 'Success',
          description: 'Your event has been created!',
        })
        setSuccess(true)
      } else {
        console.error('Failed to create event:', result.message)
        toast({
          title: 'Submission Error',
          description: result.message || 'Something went wrong while creating your event.',
        })
        setSuccess(false)
        setSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting event:', error)
      toast({
        title: 'Error',
        description: 'Unexpected error while submitting your event.',
      })
      setSuccess(false)
      setSubmitting(false)
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
