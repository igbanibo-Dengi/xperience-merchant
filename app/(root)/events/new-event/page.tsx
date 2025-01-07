'use client'

import { EventCreationForm } from '@/components/forms/event-creation-form'
import * as React from "react"

const newEventPage = () => {
    return (
        <div className='pt-10 h-full'>
            <EventCreationForm />
        </div>
    )
}

export default newEventPage