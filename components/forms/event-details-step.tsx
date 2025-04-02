'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Asterisk, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { eventDetailsSchema } from '@/lib/schema'
import { mockVenues } from '@/lib/mock-data'
import { Checkbox } from '@/components/ui/checkbox'
import type { AvailableLocations, EventDetails } from '@/types/event'
import { Badge } from '@/components/ui/badge'

interface EventDetailsStepProps {
  defaultValues?: EventDetails
  onSubmit: (data: EventDetails) => void
  onBack?: () => void
}

export function EventDetailsStep({
  defaultValues,
  onSubmit,
  onBack,
}: EventDetailsStepProps) {
  const [open, setOpen] = React.useState(false)
  const [locations] = React.useState<AvailableLocations[]>(mockVenues)
  const [manualEntry, setManualEntry] = React.useState(false)
  const [hashtagInput, setHashtagInput] = React.useState('')

  const form = useForm({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      location: {
        type: defaultValues?.location?.type || 'Physical',
        venueName: defaultValues?.location?.venueName || '',
        address: defaultValues?.location?.address || '',
        city: defaultValues?.location?.city || '',
        state: defaultValues?.location?.state || '',
        zipCode: defaultValues?.location?.zipCode || '',
      },
      eventDate: defaultValues?.eventDate || '',
      eventStartTime: defaultValues?.eventStartTime || '',
      eventEndTime: defaultValues?.eventEndTime || '',
      hashtags: defaultValues?.hashtags || [],
      planId: defaultValues?.planId || '',
    },
  })

  const handleSubmit = (data: EventDetails) => {
    onSubmit(data)
  }

  const isOnlineEvent = form.watch('location.type') === 'Online'

  const handleLocationSelect = (location: AvailableLocations) => {
    form.setValue('location.venueName', location.venueName)
    form.setValue('location.address', location.address)
    form.setValue('location.city', location.city)
    form.setValue('location.state', location.state)
    form.setValue('location.zipCode', location.zipCode)
    setOpen(false)
  }

  const handleAddHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashtagInput.trim() !== '') {
      e.preventDefault()
      const newHashtag = hashtagInput.trim().startsWith('#')
        ? hashtagInput.trim()
        : `#${hashtagInput.trim()}`

      const currentHashtags = form.getValues('hashtags') || []
      if (!currentHashtags.includes(newHashtag)) {
        form.setValue('hashtags', [...currentHashtags, newHashtag])
        setHashtagInput('')
      }
    }
  }

  const handleRemoveHashtag = (tagToRemove: string) => {
    const currentHashtags = form.getValues('hashtags') || []
    form.setValue(
      'hashtags',
      currentHashtags.filter((tag) => tag !== tagToRemove)
    )
  }

  return (
    <div className="mx-auto max-w-2xl xl:max-w-3xl">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Event Name</h2>
          <p className="text-muted-foreground">
            Write a name and description to your event so people can find it
            easily.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Event Title{' '}
                    <Asterisk className="inline text-destructive" size={10} />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Be clear and descriptive." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Event Description{' '}
                    <Asterisk className="inline text-destructive" size={10} />
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell your attendees about your event."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Event Location</h2>
                {!isOnlineEvent && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setManualEntry(!manualEntry)}
                  >
                    {manualEntry ? 'Search locations' : 'Enter Manually'}
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">
                Help people in the area find your event location.
              </p>

              <FormField
                control={form.control}
                name="location.type"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value === 'Online'}
                        onCheckedChange={(checked) => {
                          const newValue = checked ? 'Online' : 'Physical'
                          form.setValue('location.type', newValue)
                          if (newValue === 'Online') {
                            // Clear physical address fields but keep the name field
                            form.setValue('location.address', '')
                            form.setValue('location.city', '')
                            form.setValue('location.state', '')
                            form.setValue('location.zipCode', '')
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>This is an online event</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {isOnlineEvent
                          ? 'Enter the online platform details below'
                          : 'No physical location is needed for this event'}
                      </p>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.venueName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {isOnlineEvent ? 'Online Platform' : 'Venue Name'}{' '}
                      <Asterisk className="inline text-destructive" size={10} />
                    </FormLabel>
                    {!isOnlineEvent && !manualEntry ? (
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-label="Search for location"
                            aria-expanded={open}
                            className="w-full justify-start text-foreground"
                          >
                            <Search className="mr-2 h-4 w-4 shrink-0" />
                            {field.value ||
                              'Search for venue or location address'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="Search venues..." />
                            <CommandList>
                              <CommandEmpty>No venues found.</CommandEmpty>
                              <CommandGroup>
                                {locations.map((location) => (
                                  <CommandItem
                                    key={location.id}
                                    value={location.venueName}
                                    onSelect={() =>
                                      handleLocationSelect(location)
                                    }
                                  >
                                    {location.venueName}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <FormControl>
                        <Input
                          placeholder={
                            isOnlineEvent
                              ? 'e.g., Zoom, Google Meet, Microsoft Teams'
                              : 'Enter venue name'
                          }
                          {...field}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!isOnlineEvent && manualEntry && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="location.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address{' '}
                          <Asterisk
                            className="inline text-destructive"
                            size={10}
                          />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="location.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            City{' '}
                            <Asterisk
                              className="inline text-destructive"
                              size={10}
                            />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            State{' '}
                            <Asterisk
                              className="inline text-destructive"
                              size={10}
                            />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Zip Code{' '}
                            <Asterisk
                              className="inline text-destructive"
                              size={10}
                            />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Zip code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {!isOnlineEvent &&
                !manualEntry &&
                form.watch('location.venueName') && (
                  <div className="rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="font-bold">
                        {form.watch('location.venueName')}
                      </p>
                      <p className="text-sm">
                        {form.watch('location.address')}
                      </p>
                      <p className="text-sm">
                        {form.watch('location.city')},{' '}
                        {form.watch('location.state')}{' '}
                        {form.watch('location.zipCode')}
                      </p>
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Date and time</h2>
              <p className="text-muted-foreground">
                Choose a date and time for your event.
              </p>

              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Event Date{' '}
                        <Asterisk
                          className="inline text-destructive"
                          size={10}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="eventStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Start Time{' '}
                        <Asterisk
                          className="inline text-destructive"
                          size={10}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventEndTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        End Time{' '}
                        <Asterisk
                          className="inline text-destructive"
                          size={10}
                        />
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Hashtags</h2>
              <p className="text-muted-foreground">
                Add hashtags to help people discover your event.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <FormLabel>Event Hashtags</FormLabel>
                  <Input
                    placeholder="Type a hashtag and press Enter"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={handleAddHashtag}
                  />
                  <p className="text-xs text-muted-foreground">
                    Type a word and press Enter. The # will be added
                    automatically.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.watch('hashtags')?.map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-2 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveHashtag(tag)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
              )}
              <Button className="ml-auto w-[160px]" type="submit">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
