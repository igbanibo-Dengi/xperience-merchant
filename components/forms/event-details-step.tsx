"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Asterisk, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { eventDetailsSchema } from "@/lib/schema"
import { mockVenues } from "@/lib/mock-data"
interface EventDetailsStepProps {
  defaultValues?: any
  onSubmit: (data: any) => void
  onBack?: () => void
}

interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
}

export function EventDetailsStep({ defaultValues, onSubmit, onBack }: EventDetailsStepProps) {
  const [open, setOpen] = React.useState(false)
  const [venues] = React.useState<Venue[]>(mockVenues)

  const form = useForm({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      venue: defaultValues?.venue || {
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      startDate: defaultValues?.startDate || "",
      endDate: defaultValues?.endDate || "",
      startTime: defaultValues?.startTime || "",
      endTime: defaultValues?.endTime || "",
    },
  })

  const handleSubmit = (data: any) => {
    onSubmit(data)
  }

  return (
    <div className="max-w-2xl xl:max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Event Name</h2>
          <p className="">
            Write a name and description to your event so people can find it easily.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title <span><Asterisk size={10} /></span></FormLabel>
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
                  <FormLabel>Event Description <span><Asterisk size={10} /></span></FormLabel>
                  <FormControl>
                    <textarea
                      className="min-h-[100px] w-full rounded-md border border-[#9D9A98] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell your attendees about your event."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Venue Location</h2>
              <p className="">
                Help people in the area find your event location.
              </p>

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-start border-[#9D9A98] text-foreground"
                        >
                          <Search className="ml-2 h-4 w-4 shrink-0 " />
                          {field.value?.name || "Search for venue or location address"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Search venues..." />
                          <CommandList>
                            <CommandEmpty>No venues found.</CommandEmpty>
                            <CommandGroup>
                              {venues.map((venue) => (
                                <CommandItem
                                  key={venue.id}
                                  value={venue.name}
                                  onSelect={() => {
                                    form.setValue("venue", venue, { shouldValidate: true })
                                    setOpen(false)
                                  }}
                                >
                                  {venue.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("venue.name") && (
                <div className="rounded-lg p-4">
                  <div className="space-y-1">
                    <p className="font-bold">{form.watch("venue.name")}</p>
                    <p className="text-sm">
                      {form.watch("venue.address")}
                    </p>
                    <p className="text-sm">
                      {form.watch("venue.city")}, {form.watch("venue.state")}{" "}
                      {form.watch("venue.zipCode")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Date and time</h2>
              <p className="">
                Choose a date for your event.
              </p>

              <div className="grid gap-4 grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between">
              {onBack && (
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
              )}
              <Button className="w-[160px] ml-auto" type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

