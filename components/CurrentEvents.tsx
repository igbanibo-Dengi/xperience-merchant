"use client"

import { useState } from "react"
import { Dot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import type { Event } from "@/types/event"
import { EventSearch } from "./eventsSearch"

interface CurrentEventsProps {
  events?: Event[]
}

const CurrentEvents = ({ events = [] }: CurrentEventsProps) => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)
  const currentDate = new Date()

  // Filter for current/live events
  const liveEvents = filteredEvents.filter((event) => {
    try {
      const eventStartDateTime = new Date(`${event.eventDate}T${event.eventStartTime}`)
      const eventEndDateTime = new Date(`${event.eventDate}T${event.eventEndTime}`)
      return currentDate >= eventStartDateTime && currentDate <= eventEndDateTime
    } catch (error) {
      return false
    }
  })

  const handleSearch = (searchResults: Event[]) => {
    setFilteredEvents(searchResults)
  }

  return (
    <section className="mt-8 max-w-4xl w-full px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <EventSearch onSearch={handleSearch} allEvents={events} />
      </div>

      {/* LIVE EVENTS */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 mb-4">
          <span className="text-primary">
            <Dot className="h-8 w-8" />
          </span>
          <span className="text-lg font-bold">Live Now</span>
        </h2>
        {liveEvents.length > 0 ? (
          <div className="space-y-4">
            {liveEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-4 p-8 text-center text-muted-foreground border-2 border-dashed rounded-md">
            <p>No live events available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CurrentEvents

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

  return (
    <div className="mt-4 flex flex-col md:flex-row md:h-[160px] items-start md:items-center justify-between rounded-md border-2 p-4 md:p-8 gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative w-full md:w-[100px] h-[100px] rounded-md overflow-hidden">
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
            {formatEventDate(event.eventDate)} at {formatEventTime(event.eventStartTime)}
          </p>
          {event.location.type === "Physical" && event.location.city && event.location.state && (
            <p className="text-sm text-muted-foreground mt-1">
              {event.location.city}, {event.location.state}
            </p>
          )}
        </div>
      </div>
      <Button size="sm" className="bg-primary hover:bg-primary/90 w-full md:w-auto" asChild>
        <Link href={`/events/${event._id}`}>View Event Details</Link>
      </Button>
    </div>
  )
}

