"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import type { EventData, Photo, XperienceMoment } from '@/types/event'

interface EventContextType {
  eventData: EventData
  updateMoment: (id: string, moment: Partial<XperienceMoment>) => void
  addPhoto: (photo: Photo) => void
  removePhoto: (id: string) => void
  timeUntilNext: string
}

const EventContext = createContext<EventContextType | null>(null)

// Sample data
const initialEventData: EventData = {
  title: "Taylor Swift: Eras Tour",
  date: "November 1, 2024 at 7:00PM",
  venue: "Scotiabank Arena",
  isLive: true,
  nextMomentTime: "00:09:37",
  photos: Array(12).fill(null).map((_, i) => ({
    id: `photo-${i}`,
    url: "/placeholder.svg",
    timestamp: new Date().toISOString()
  })),
  recentPhotos: Array(5).fill(null).map((_, i) => ({
    id: `recent-${i}`,
    url: "/placeholder.svg",
    timestamp: new Date().toISOString()
  })),
  xperienceMoments: [
    {
      id: "moment-1",
      startTime: "7:30",
      endTime: "7:35",
      transitionTime: 5,
      slides: Array(12).fill(null).map((_, i) => i + 1),
      photos: Array(6).fill(null).map((_, i) => ({
        id: `moment1-photo-${i}`,
        url: "/placeholder.svg",
        timestamp: new Date().toISOString()
      })),
      submittedPhotos: Array(12).fill(null).map((_, i) => ({
        id: `moment1-submitted-${i}`,
        url: "/placeholder.svg",
        timestamp: new Date().toISOString()
      }))
    }
  ],
  analytics: {
    photosUploaded: 8756,
    liveUsers: 3692
  }
}

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [eventData, setEventData] = useState<EventData>(initialEventData)
  const [timeUntilNext, setTimeUntilNext] = useState(eventData.nextMomentTime)

  useEffect(() => {
    const timer = setInterval(() => {
      // Update countdown timer
      const [minutes, seconds, milliseconds] = timeUntilNext.split(/[:.]/).map(Number)
      let totalMs = (minutes * 60 + seconds) * 1000 + (milliseconds || 0)
      totalMs -= 10

      if (totalMs <= 0) {
        clearInterval(timer)
        setTimeUntilNext("00:00:00")
      } else {
        const newMinutes = Math.floor(totalMs / 60000)
        const newSeconds = Math.floor((totalMs % 60000) / 1000)
        const newMilliseconds = Math.floor((totalMs % 1000) / 10)
        setTimeUntilNext(
          `${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}:${String(newMilliseconds).padStart(2, '0')}`
        )
      }
    }, 10)

    return () => clearInterval(timer)
  }, [timeUntilNext])

  const updateMoment = (id: string, moment: Partial<XperienceMoment>) => {
    setEventData(prev => ({
      ...prev,
      xperienceMoments: prev.xperienceMoments.map(m =>
        m.id === id ? { ...m, ...moment } : m
      )
    }))
  }

  const addPhoto = (photo: Photo) => {
    setEventData(prev => ({
      ...prev,
      photos: [photo, ...prev.photos],
      recentPhotos: [photo, ...prev.recentPhotos.slice(0, 4)]
    }))
  }

  const removePhoto = (id: string) => {
    setEventData(prev => ({
      ...prev,
      photos: prev.photos.filter(p => p.id !== id),
      recentPhotos: prev.recentPhotos.filter(p => p.id !== id)
    }))
  }

  return (
    <EventContext.Provider value={{
      eventData,
      updateMoment,
      addPhoto,
      removePhoto,
      timeUntilNext
    }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvent = () => {
  const context = useContext(EventContext)
  if (!context) throw new Error('useEvent must be used within an EventProvider')
  return context
}

