import React from 'react'
import { Dot, Plus, Search } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from './ui/input'

type Event = {
  id: number
  title: string
  date: string
  time: string
  type: 'live' | 'upcoming'
}

const CurrentEvents = () => {
  // Dummy live event data
  const events: Event[] = [
    {
      id: 1,
      title: 'Taylor Swift Eras Tour',
      date: 'November 1, 2024',
      time: '7:00 PM',
      type: 'live',
    },
    {
      id: 2,
      title: 'Super Bowl Halftime Show',
      date: 'November 3, 2024',
      time: '8:30 PM',
      type: 'live',
    },
  ]

  // Filter live events
  const liveEvents = events.filter((event) => event.type === 'live')

  return (
    <section className="mt-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <span className="relative flex items-center">
          <Search className="absolute left-2 top-3 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for events"
            className="pl-12 text-2xl"
          />
        </span>

        <Button size="lg" asChild>
          <Link href="/events/new-event">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>
      <div>
        <h2 className="flex items-center gap-2">
          <span className="text-6xl text-primary">•</span>
          <span className="text-lg font-bold text-primary">Live Now</span>
        </h2>
        {liveEvents.length > 0 ? (
          liveEvents.map((event) => (
            <div
              key={event.id}
              className="mt-4 flex h-[160px] min-h-[100px] items-center justify-between rounded-md border-2 p-8"
            >
              <span className="flex items-center gap-2">
                <p className="text-2xl font-semibold capitalize">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <Image
                  src="/images/swift.jpg"
                  alt="Event Image"
                  width={100}
                  height={100}
                />
                <span>
                  <p className="text-xl font-semibold">{event.title}</p>
                  <p>{`${event.date} at ${event.time}`}</p>
                </span>
              </span>
              <span className="flex h-full items-end bg-red-50">
                <Button
                  size="sm"
                  className="bg-black hover:bg-black/80"
                  asChild
                >
                  <Link href="events/1">View Event Details</Link>
                </Button>
              </span>
            </div>
          ))
        ) : (
          <div className="mt-4 text-center text-muted-foreground">
            <p>No live events available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CurrentEvents
