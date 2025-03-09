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
  coverPhoto?: File | null // File before upload
  coverPhotoUrl?: string // Uploaded URL from server

  sampleFeedPhotos?: File[] // Files before upload
  sampleFeedPhotosUrls?: string[] // Uploaded URLs from server
}


export interface ExperienceMoments {
  active: boolean
  recurrence?: string
  duration?: string
}

export interface PhotoUploadStepProps {
  defaultValues?: {
    coverPhoto?: File | null
    sampleFeedPhotos?: File[]
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

