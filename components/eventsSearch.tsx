'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import type { Event } from '@/types/event'

interface EventSearchProps {
  onSearch: (filteredEvents: Event[]) => void
  allEvents: Event[]
}

export function EventSearch({ onSearch, allEvents }: EventSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      // If search is empty, return all events
      onSearch(allEvents)
      return
    }

    const lowercaseQuery = query.toLowerCase()

    // Filter events based on search query
    const filteredEvents = allEvents.filter(
      (event) => event.title.toLowerCase().includes(lowercaseQuery)
      // ||
      // event.description.toLowerCase().includes(lowercaseQuery) ||
      // (event.location.type === "Physical" &&
      //   (event.location.city?.toLowerCase().includes(lowercaseQuery) ||
      //     event.location.state?.toLowerCase().includes(lowercaseQuery) ||
      //     event.location.venueName?.toLowerCase().includes(lowercaseQuery))) ||
      // event.hashtags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )

    onSearch(filteredEvents)
  }

  return (
    <div className="relative flex w-full items-center">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for events"
        className="w-full pl-10"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}
