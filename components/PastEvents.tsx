import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search } from 'lucide-react';
import { Input } from './ui/input';

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'live' | 'upcoming' | 'past';
};

const PastEvent = () => {
  // Dummy past event data
  const events: Event[] = [
    {
      id: 1,
      title: 'Rock Fest 2023',
      date: 'October 15, 2023',
      time: '6:00 PM',
      type: 'past',
    },
    {
      id: 2,
      title: 'Jazz Night 2023',
      date: 'November 2, 2023',
      time: '7:30 PM',
      type: 'past',
    },
    {
      id: 3,
      title: 'Symphony Gala',
      date: 'December 10, 2023',
      time: '8:00 PM',
      type: 'past',
    },
  ];

  // Filter past events
  const pastEvents = events.filter(event => event.type === 'past');

  return (
    <section className="max-w-4xl mt-8">
      <div className="flex justify-between items-center">
        <span className="relative flex items-center">
          <Search className="absolute left-2 top-3 text-muted-foreground" />
          <Input type="text" placeholder="Search for events" className="pl-12 text-2xl" />
        </span>

        <Button size="lg" asChild>
          <Link href="/events/new-event">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {pastEvents.length > 0 ? (
        pastEvents.map(event => (
          <div
            key={event.id}
            className="border-2 h-[160px] min-h-[100px] p-8 rounded-md flex items-center justify-between mt-4"
          >
            <span className='flex items-center gap-2'>
              <p className="capitalize text-2xl font-semibold">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <Image
                src='/images/swift.jpg'
                alt="Event Image"
                width={100}
                height={100}
              />
              <span>
                <p className="font-semibold text-xl">{event.title}</p>
                <p>{`${event.date} at ${event.time}`}</p>
              </span>
            </span>
            <span className="flex items-end h-full bg-red-50">
              <Button size="sm" className="bg-black hover:bg-black/80" asChild>
                <Link href='events/1'>
                  View Event Details
                </Link>
              </Button>
            </span>
          </div>
        ))
      ) : (
        <div className="text-center mt-4 text-muted-foreground">
          <p>No past events available</p>
        </div>
      )}
    </section>
  );
};

export default PastEvent;
