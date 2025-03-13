import { Dot, Plus, Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { getAllEvents } from "@/lib/actions/events/getAllEvents"
import type { EventsData, Event } from "@/types/event"

const AllEvents = async () => {
  let eventsData: EventsData = []

  try {
    const response = await getAllEvents()
    // Access the events array from response.data
    eventsData = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error("Failed to fetch events:", error)
    // Continue with empty array
  }

  const currentDate = new Date()

  const liveEvents = eventsData.filter((event) => {
    try {
      const eventStartDateTime = new Date(`${event.eventStartDay}T${event.eventStartTime}`)
      const eventEndDateTime = new Date(`${event.eventEndDay}T${event.eventEndTime}`)
      return currentDate >= eventStartDateTime && currentDate <= eventEndDateTime
    } catch (error) {
      console.error(`Error parsing date for event ${event._id}:`, error)
      return false
    }
  })

  const upcomingEvents = eventsData.filter((event) => {
    try {
      const eventStartDateTime = new Date(`${event.eventStartDay}T${event.eventStartTime}`)
      return eventStartDateTime > currentDate
    } catch (error) {
      console.error(`Error parsing date for event ${event._id}:`, error)
      return false
    }
  })

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
      // Parse time in 24-hour format (HH:MM:SS)
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

  const EventCard = ({ event }: { event: Event }) => (
    <div
      key={event._id}
      className="mt-4 flex flex-col md:flex-row md:h-[160px] items-start md:items-center justify-between rounded-md border-2 p-4 md:p-8 gap-4"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative w-full md:w-[100px] h-[100px] rounded-md overflow-hidden">
          <Image
            src={event.coverPhotoUrl?.[0] || "/placeholder.svg?height=100&width=100"}
            alt={event.title}
            fill
            className="object-cover rounded-md"
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement
          //   target.src = "/placeholder.svg?height=100&width=100"
          // }}
          />
        </div>
        <div>
          <p className="text-xl font-semibold">{event.title}</p>
          <p className="text-muted-foreground">
            {formatEventDate(event.eventStartDay)} at {formatEventTime(event.eventStartTime)}
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

  return (
    <section className="mt-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <span className="relative flex items-center">
          <Search className="absolute left-2 top-3 text-muted-foreground" />
          <Input type="text" placeholder="Search for events" className="pl-12 text-2xl" />
        </span>
        <Button size="lg" asChild>
          <Link href="/events/new-event">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
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

      {/* UPCOMING EVENTS */}
      <div className="mt-8">
        <h2 className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold">Upcoming Events</span>
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-4 p-8 text-center text-muted-foreground border-2 border-dashed rounded-md">
            <p>No upcoming events</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default AllEvents

