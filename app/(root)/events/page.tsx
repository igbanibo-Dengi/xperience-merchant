import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <h3 className='text-[32px] font-bold'>My Events</h3>
            <div className='flex flex-col gap-4'>
                <Link href="/events/1">Taylor Swift: Eras Tour</Link>
                <Button className='w-fit' asChild>
                    <Link href="/events/new-event">Create Event</Link>
                </Button>
            </div>
        </div>
    )
}

export default page