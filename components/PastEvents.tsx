'use client'

import { useState } from 'react'
import { History } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import type { Event } from '@/types/event'
import { EventSearch } from './eventsSearch'

interface PastEventsProps {
  events?: Event[]
}

const PastEvents = ({ events = [] }: PastEventsProps) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)
  const currentDate = new Date()

  // Filter for past events
  const pastEvents = filteredEvents
    .filter((event) => {
      try {
        const eventEndDateTime = new Date(
          `${event.eventEndDay}T${event.eventEndTime}`
        )
        return eventEndDateTime < currentDate
      } catch (error) {
        return false
      }
    })
    .sort((a, b) => {
      // Sort by most recent first
      const dateA = new Date(`${a.eventEndDay}T${a.eventEndTime}`)
      const dateB = new Date(`${b.eventEndDay}T${b.eventEndTime}`)
      return dateB.getTime() - dateA.getTime()
    })

  const handleSearch = (searchResults: Event[]) => {
    setFilteredEvents(searchResults)
  }

  return (
    <section className="mt-8 w-full max-w-4xl px-4">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <EventSearch onSearch={handleSearch} allEvents={events} />
      </div>

      {/* PAST EVENTS */}
      <div className="mt-8">
        <h2 className="mb-4 flex items-center gap-2">
          <span className="text-primary">
            <History className="h-6 w-6" />
          </span>
          <span className="text-lg font-bold">Past Events</span>
        </h2>
        {pastEvents.length > 0 ? (
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-md border-2 border-dashed p-8 text-center text-muted-foreground">
            <p>No past events</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default PastEvents

// Event card component
function EventCard({ event }: { event: Event }) {
  const formatEventDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    } catch (error) {
      return dateStr
    }
  }

  const formatEventTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':')
      const date = new Date()
      date.setHours(Number.parseInt(hours, 10))
      date.setMinutes(Number.parseInt(minutes, 10))

      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    } catch (error) {
      return timeStr
    }
  }

  // Calculate days since event ended
  const getDaysSince = (endDay: string) => {
    try {
      const eventEndDate = new Date(endDay)
      const today = new Date()

      // Reset time part for accurate day calculation
      eventEndDate.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)

      const diffTime = today.getTime() - eventEndDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) return 'Ended today'
      if (diffDays === 1) return 'Ended yesterday'
      return `Ended ${diffDays} days ago`
    } catch (error) {
      return ''
    }
  }

  return (
    <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-md border-2 p-4 opacity-80 md:h-[160px] md:flex-row md:items-center md:p-8">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="relative h-[100px] w-full overflow-hidden rounded-md grayscale md:w-[100px]">
          <Image
            src={
              event.coverPhotoUrl?.[0] ||
              '/placeholder.svg?height=100&width=100'
            }
            alt={event.title}
            fill
            className="rounded-md object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/placeholder.svg?height=100&width=100'
            }}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">{event.title}</p>
          <p className="text-muted-foreground">
            {formatEventDate(event.eventStartDay)} -{' '}
            {formatEventDate(event.eventEndDay)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {getDaysSince(event.eventEndDay)}
          </p>
          {event.location.type === 'Physical' &&
            event.location.city &&
            event.location.state && (
              <p className="mt-1 text-sm text-muted-foreground">
                {event.location.city}, {event.location.state}
              </p>
            )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto">
        <Button
          size="sm"
          className="w-full bg-primary hover:bg-primary/90"
          asChild
        >
          <Link href={`/events/${event._id}`}>View Details</Link>
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          View Analytics
        </Button>
      </div>
    </div>
  )
}
