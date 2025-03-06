export interface EventData {
  eventDetails: EventDetails
  eventImages: EventImages
  experienceMoments: ExperienceMoments
}

export interface EventDetails {
  title: string
  description: string
  location: EventLocation
  eventStartDay: string
  eventEndDay: string
  eventStartTime: string
  eventEndTime: string
}

export interface EventLocation {
  type: string
  venueName: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export interface AvailableLocations {
  id: string
  venueName: string
  address: string
  city: string
  state: string
  zipCode: string
}

export interface EventImages {
  coverPhotoUrl?: File | null
  sampleFeedPhotosUrl?: File[]
}

export interface ExperienceMoments {
  active: boolean
  recurrence?: string
  duration?: string
}

export interface PhotoUploadStepProps {
  defaultValues?: {
    coverPhotoUrl?: File | null
    sampleFeedPhotosUrl?: File[]
  }
  onSubmit: (data: any) => void
  onBack: () => void
}

export interface ExperienceMomentsStepProps {
  defaultValues?: {
    active: boolean
    recurrence?: string
    duration?: string
  }
  onSubmit: (data: any) => void
  onBack: () => void
}

export interface ReviewStepProps {
  eventData: EventData
  onSubmit: () => void
  onBack: () => void
  onEdit: (step: string) => void
}

