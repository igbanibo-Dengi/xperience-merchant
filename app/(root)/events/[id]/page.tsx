import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, PhoneOutgoing, User, Calendar, Clock, Settings, BarChart3, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

import EventOverview from "@/components/event-components/EventOverview"
import EventPhotos from "@/components/event-components/EventPhotos"
import EventXperienceMoments from "@/components/event-components/EventXperienceMoments"
import QRCodeComponent from "@/components/QRCodeComponent"

import { getEventById } from "@/lib/actions/events/getEventById"
import { formatDate } from "@/lib/utils"
import CountdownTimer from "@/components/CountdownTimer"
import EventSettings from "@/components/EventSettings"

interface EventPageProps {
  params: {
    id: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  try {
    const response = await getEventById(params.id)

    // Check if response is a NextResponse (error case)
    if ("status" in response) {
      if (response.status === 404) {
        notFound()
      }
      // Handle other error cases
      throw new Error(`Failed to load event: ${response.statusText || "Unknown error"}`)
    }

    const event = response.data
    const isToday = new Date(event.eventDate).toDateString() === new Date().toDateString()
    // const nextMomentTime = event.xperienceMoments?.[0]?.time || null // Assuming you have xperienceMoments data

    return (
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{event.title}</h1>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {formatDate(event.eventDate)}
                  {isToday && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Today
                    </span>
                  )}
                </p>
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

              {event.eventStartTime && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{event.eventStartTime}</span>
                </div>
              )}

              {event.location.type === "Virtual" && (
                <div className="mt-2 rounded-md bg-blue-50 px-3 py-2 text-blue-800">
                  <p className="font-medium">Virtual Event</p>
                </div>
              )}
            </div>

            {/* {nextMomentTime && (
              <CountdownTimer targetTime={nextMomentTime} label="Next Xperience moment" className="mt-4 lg:mt-0" />
            )} */}
          </div>
        </header>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b">
            <TabsList className="h-auto w-full justify-start gap-2 rounded-none bg-transparent p-0">
              <TabsTrigger
                value="overview"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">Photos</span>
              </TabsTrigger>
              <TabsTrigger
                value="xperience-moments"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">
                  <span className="hidden sm:inline">Xperience</span> Moments
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="qr-code"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span className="hidden sm:inline">QR Code</span>
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="event-settings"
                className="rounded-t-lg border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-muted data-[state=active]:font-semibold"
              >
                <span className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <TabsContent value="overview" className="mt-0">
                <EventOverview event={event} />
              </TabsContent>
              <TabsContent value="photos" className="mt-0">
                <EventPhotos event={event} />
              </TabsContent>
              <TabsContent value="xperience-moments" className="mt-0">
                <EventXperienceMoments event={event} />
              </TabsContent>
              <TabsContent value="analytics" className="mt-0">
                {/* <EventAnalytics event={event} /> */}
              </TabsContent>
              <TabsContent value="qr-code" className="mt-0">
                <div className="space-y-6">
                  <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Event QR Code</h2>
                    <p className="mb-6 text-muted-foreground">
                      Share this QR code with your attendees to provide quick access to the event page.
                    </p>
                    <div>
                      <QRCodeComponent
                        value={event._id}
                        download
                        share
                        size={300}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="event-settings" className="mt-0">
                <EventSettings event={event} />
              </TabsContent>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Analytics</h2>
                    <Button variant="link" className="p-0 text-primary" asChild>
                      <Link href={`/events/${event._id}/analytics`}>View All</Link>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <span className="flex items-center gap-2">
                        <PhoneOutgoing className="h-5 w-5 text-muted-foreground" />
                        <p>Photos Uploaded:</p>
                      </span>
                      <p className="font-bold">1234</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <span className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <p>Live Users:</p>
                      </span>
                      <p className="font-bold">1234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold">Scan QR Code</h3>
                      <p className="text-sm text-muted-foreground">
                        For a quick glance at the attendee side, scan here.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <QRCodeComponent
                        value={event._id}
                        size={120}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error loading event:", error)
    throw new Error("Failed to load event. Please try again later.")
  }
}

