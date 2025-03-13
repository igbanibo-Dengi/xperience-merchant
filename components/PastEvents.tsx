"use client"

import { useState } from "react"
import { History } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import type { Event } from "@/types/event"
import { EventSearch } from "./eventsSearch"

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
        const eventEndDateTime = new Date(`${event.eventEndDay}T${event.eventEndTime}`)
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
    <section className="mt-8 max-w-4xl w-full px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <EventSearch onSearch={handleSearch} allEvents={events} />
      </div>

      {/* PAST EVENTS */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 mb-4">
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
          <div className="mt-4 p-8 text-center text-muted-foreground border-2 border-dashed rounded-md">
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
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch (error) {
      return dateStr
    }
  }

  const formatEventTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(":")
      const date = new Date()
      date.setHours(Number.parseInt(hours, 10))
      date.setMinutes(Number.parseInt(minutes, 10))

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
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

      if (diffDays === 0) return "Ended today"
      if (diffDays === 1) return "Ended yesterday"
      return `Ended ${diffDays} days ago`
    } catch (error) {
      return ""
    }
  }

  return (
    <div className="mt-4 flex flex-col md:flex-row md:h-[160px] items-start md:items-center justify-between rounded-md border-2 p-4 md:p-8 gap-4 opacity-80">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative w-full md:w-[100px] h-[100px] rounded-md overflow-hidden grayscale">
          <Image
            src={event.coverPhotoUrl?.[0] || "/placeholder.svg?height=100&width=100"}
            alt={event.title}
            fill
            className="object-cover rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=100&width=100"
            }}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">{event.title}</p>
          <p className="text-muted-foreground">
            {formatEventDate(event.eventStartDay)} - {formatEventDate(event.eventEndDay)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{getDaysSince(event.eventEndDay)}</p>
          {event.location.type === "Physical" && event.location.city && event.location.state && (
            <p className="text-sm text-muted-foreground mt-1">
              {event.location.city}, {event.location.state}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button size="sm" className="bg-primary hover:bg-primary/90 w-full" asChild>
          <Link href={`/events/${event._id}`}>View Details</Link>
        </Button>
        <Button size="sm" variant="outline" className="w-full">
          View Analytics
        </Button>
      </div>
    </div>
  )
}

