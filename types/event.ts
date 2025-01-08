export interface Photo {
  id: string
  url: string
  timestamp: string
}

export interface XperienceMoment {
  id: string
  startTime: string
  endTime: string
  transitionTime: number
  slides: number[]
  photos: Photo[]
  submittedPhotos: Photo[]
}

export interface EventData {
  title: string
  date: string
  venue: string
  isLive: boolean
  nextMomentTime: string
  photos: Photo[]
  recentPhotos: Photo[]
  xperienceMoments: XperienceMoment[]
  analytics: {
    photosUploaded: number
    liveUsers: number
  }
}

