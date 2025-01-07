import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const EventSuucess = () => {
  return (
    <div className='h-full w-full flex flex-col text-center items-center justify-center min-h-[70vh]'>
      <p className='font-bold text-[48px]'>You&apos;re all set!</p>
      <p className='text-lg font-semibold mt-4'>Your event is officially live and ready to go. Invite your audience, <br className='hidden md:block' /> track engagement, and make any changes as needed. <br className='hidden md:block' /> It&apos;s showtime! 🎉</p>
      <div className='flex flex-col gap-y-4 items-center justify-center mt-8 md:w-[328px]'>
        <Button variant={"outline"} className='w-full' size={"lg"} >
          <Link href="/events">
            Go to Events
          </Link>
        </Button>
        <Button className='w-full' size={"lg"} asChild>
          <Link href="/home">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default EventSuucess