// import React from 'react'
// import { Button } from '@/components/ui/button'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Separator } from '@/components/ui/separator'
// import EventOverview from '@/components/event-components/EventOverview'
// import EventPhotos from '@/components/event-components/EventPhotos'
// import EventXperienceMoments from '@/components/event-components/EventXperienceMoments'

// const page = () => {
//   return (
//     <div className="">
//       <h3 className="text-2xl font-bold md:text-[32px]">
//         Taylor Swift: Eras Tour
//       </h3>
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//         <span className="">
//           <span className="flex flex-col gap-2 lg:flex-row lg:items-center">
//             <p className="text-lg font-semibold">November 1, 2024 at 7:00PM</p>
//             <p className="flex items-center gap-2 font-semibold text-primary">
//               <span className="text-4xl text-primary md:text-6xl">•</span>
//               EVENT IS LIVE NOW
//             </p>
//           </span>
//           <p className="text-lg font-medium">Scotiabank Arena</p>
//         </span>
//         <Button
//           size={'lg'}
//           variant={'outline'}
//           className="mt-4 flex items-center gap-2 border-foreground text-foreground lg:mt-0"
//         >
//           <p>
//             Next Xperience moment: <span>00:09:37</span>
//           </p>
//         </Button>
//       </div>

//       {/* TABS */}
//       <Tabs defaultValue="overview" className="mt-8 w-full p-0">
//         <TabsList className="m-0 rounded-none bg-background p-0">
//           <div className="mb-16 grid grid-cols-3 rounded-md border-2 border-foreground p-2 pb-0 md:grid-cols-6 md:rounded-none md:border-x-0 md:border-t-0 md:px-0">
//             <TabsTrigger
//               value="overview"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               Overview
//             </TabsTrigger>
//             <TabsTrigger
//               value="photos"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               Photos
//             </TabsTrigger>
//             <TabsTrigger
//               value="xperience-moments"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               <span className="hidden lg:block"> Xperience </span>Moments
//             </TabsTrigger>
//             <TabsTrigger
//               value="analytics"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               Analytics
//             </TabsTrigger>
//             <TabsTrigger
//               value="qr-code"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               QR Code
//             </TabsTrigger>
//             <TabsTrigger
//               value="event-settings"
//               className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
//             >
//               Event Settings
//             </TabsTrigger>
//           </div>
//         </TabsList>
//         {/* <Separator className='hidden lg:block translate-y-[-4px] h-0.5 bg-black opacity-25' /> */}

//         <TabsContent value="overview">
//           <EventOverview />
//         </TabsContent>
//         <TabsContent value="photos">
//           <EventPhotos />
//         </TabsContent>
//         <TabsContent value="xperience-moments">
//           <EventXperienceMoments />
//         </TabsContent>
//         <TabsContent value="analytics">
//           <p className="text-muted-foreground">
//             Analytics data will be displayed here.
//           </p>
//         </TabsContent>
//         <TabsContent value="qr-code">
//           {/*V0.DEV INSERT COMING SOON UI HERE */}
//         </TabsContent>
//         <TabsContent value="event-settings">
//           {/*V0.DEV INSERT COMING SOON UI HERE */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default page


import { getEventById } from "@/lib/actions/events/getEventById"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Tag } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import QRCodeComponent from "@/components/QRCodeComponent"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const response = await getEventById(params.id)

  // Check if response is a NextResponse (error case)
  if ("status" in response) {
    if (response.status === 404) {
      notFound()
    }
    // Handle other error cases
    throw new Error("Failed to load event")
  }

  const event = response.data

  console.log(event)

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format time for display
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours, 10))
    date.setMinutes(Number.parseInt(minutes, 10))

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/events" className="text-primary hover:underline">
          ← Back to Events
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src={event.coverPhotoUrl?.[0] || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="mr-2 h-5 w-5" />
              <span>
                {formatDate(event.eventDate)}
              </span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-5 w-5" />
              <span>
                {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
              </span>
            </div>
            {event.location.type === "Physical" && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-5 w-5" />
                <span>
                  {event.location.venueName}
                  {event.location.city && event.location.state && `, ${event.location.city}, ${event.location.state}`}
                </span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
            <p className="whitespace-pre-line text-muted-foreground">{event.description}</p>
          </div>

          {event.hashtags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.hashtags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full">
                    <Tag className="mr-1 h-4 w-4" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.sampleFeedPhotosUrl.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Event Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {event.sampleFeedPhotosUrl.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`Event photo ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow-sm border sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-medium">Organizer</p>
                <p className="text-muted-foreground">{event.organizerId.fullName}</p>
                <p className="text-muted-foreground text-sm">{event.organizerId.companyName}</p>
              </div>

              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-muted-foreground">
                  {formatDate(event.eventDate)}
                </p>
                <p className="text-muted-foreground">
                  {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
                </p>
              </div>

              {event.location.type === "Physical" && (
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{event.location.venueName}</p>
                  {event.location.address && <p className="text-muted-foreground">{event.location.address}</p>}
                  {event.location.city && event.location.state && (
                    <p className="text-muted-foreground">
                      {event.location.city}, {event.location.state} {event.location.zipCode}
                    </p>
                  )}
                </div>
              )}

              {event.location.type === "Virtual" && (
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Virtual Event</p>
                </div>
              )}

              <div>
                <p className="font-medium">Plan</p>
                <p className="text-muted-foreground">{event.planId.name}</p>
                <p className="text-muted-foreground text-sm">{event.planId.description}</p>
              </div>
            </div>

            <QRCodeComponent value={`xperience/events/${event._id}`} />

            <div className="space-y-3">
              <Button className="w-full">Register for Event</Button>
              <Button variant="outline" className="w-full">
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

