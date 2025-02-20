import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const EventSuucess = () => {
  return (
    <div className="flex h-full min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <p className="text-[48px] font-bold">You&apos;re all set!</p>
      <p className="mt-4 text-lg font-semibold">
        Your event is officially live and ready to go. Invite your audience,{' '}
        <br className="hidden md:block" /> track engagement, and make any
        changes as needed. <br className="hidden md:block" /> It&apos;s
        showtime! 🎉
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-y-4 md:w-[328px]">
        <Button variant={'outline'} className="w-full" size={'lg'}>
          <Link href="/events">Go to Events</Link>
        </Button>
        <Button className="w-full" size={'lg'} asChild>
          <Link href="/home">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

export default EventSuucess
