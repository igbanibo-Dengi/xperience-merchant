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
  hashtags: string[]
  planId: string
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
  submitting: boolean
}

export interface FormattedData {
  title: string;
  description: string;
  location: EventLocation;
  eventStartDay: string;
  eventEndDay: string;
  eventStartTime: string;
  eventEndTime: string;
  hashtags: string[];
  xperienceMoment: ExperienceMoments;
  planId: string;
  coverPhotoUrl: string;
  sampleFeedPhotosUrl: string[];
}


/////FOR FETCHED EVENT DATA==========================///////////////

export interface Location {
  type: 'Physical' | 'Virtual';
  venueName?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface OrganizerSettings {
  pushNotifications: boolean;
  mode: string;
}

export interface Organizer {
  settings: OrganizerSettings;
  isProfileComplete: boolean;
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userType: 'organizer' | 'attendee';
  googleId: string | null;
  companyName: string;
  address: string;
  industry: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface Plan {
  _id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
  organizerId: string;
}

export interface Event {
  location: Location;
  _id: string;
  organizerId: Organizer;
  planId: Plan;
  title: string;
  description: string;
  eventStartDay: string;
  eventEndDay: string;
  eventStartTime: string;
  eventEndTime: string;
  coverPhotoUrl: string[];
  sampleFeedPhotosUrl: string[];
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
  xperienceMomentId: string;
}

export type EventsData = Event[];
