'use client'

import { EventCreationForm } from '@/components/forms/event-creation-form'
import * as React from 'react'

const newEventPage = () => {
  return (
    <div className="h-full pt-10">
      <EventCreationForm />
    </div>
  )
}

export default newEventPage
