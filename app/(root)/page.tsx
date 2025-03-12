'use client'

import { Button } from '@/components/ui/button'
import { CircleAlert, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const [showAlert, setShowAlert] = useState(true)

  const event = 0

  return (
    <div className="p-6">
      {/* Header */}
      <h3 className="mb-4 text-[32px] font-bold">Hey there, John</h3>

      {/* Content Section */}
      <div className="flex justify-between">
        {/* Left Section */}
        <div className="flex-1">
          {/* Alert Section */}
          {showAlert && event < 1 && (
            <div className="relative mb-6 flex items-center justify-between gap-4 rounded-md border border-blue-300 bg-blue-100 p-8 text-[#213959]">
              <CircleAlert
                fill="#213959"
                stroke="white"
                size={60}
                className="rotate-180"
              />
              <div>
                <h4 className="mb-4 font-semibold">
                  Welcome to your dashboard!
                </h4>
                <p className="text-sm">
                  Here, you can create and manage events, track engagement, and
                  explore insights. Check out the support tab for further
                  guidance!
                </p>
              </div>
              <button
                className="absolute right-2 top-2 text-xl font-bold text-blue-800 hover:text-blue-900"
                onClick={() => setShowAlert(false)}
              >
                <X size={24} />
              </button>
            </div>
          )}

          {/* Upcoming Events */}
          <div>
            <h4 className="mb-4 text-lg font-bold">Upcoming Events</h4>
            <div className="rounded-md border-2 p-8 text-center">
              <p className="mb-4">You have no upcoming events.</p>
              <Button size={'lg'} asChild>
                <Link href="/events/new-event">+ Create Event</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        {showAlert && event < 1 && (
          <div className="ml-6 h-fit w-[300px] rounded-md border-2 p-4">
            <h4 className="mb-2 font-semibold">
              Take your events to the next level!
            </h4>
            <p className="mb-4 text-sm text-gray-500">
              Upgrade to Enterprise now to try:
            </p>
            <ul className="mb-6 list-inside list-disc text-sm text-gray-700">
              <li>Unlimited number of events</li>
              <li>Full suite of advanced analytics and reporting</li>
            </ul>
            <button className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800">
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Page
