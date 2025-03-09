"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from "lucide-react"
import Image from "next/image"
import type { ReviewStepProps } from "@/types/event"

export function ReviewStep({ eventData, onSubmit, onBack, onEdit }: ReviewStepProps) {
  const { eventDetails, eventImages, experienceMoments } = eventData

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold md:text-[32px]">Review Your Event</h2>
          <p className="text-muted-foreground">Please review all the information before submitting your event.</p>
        </div>

        {/* Event Details Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Event Details</h3>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-primary"
                onClick={() => onEdit("details")}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium">Event Name</h4>
                <p>{eventDetails.title}</p>
              </div>
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="whitespace-pre-wrap">{eventDetails.description}</p>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                {eventDetails.location.type === "Online" ? (
                  <p>{eventDetails.location.venueName} (Online Event)</p>
                ) : (
                  <div>
                    <p>{eventDetails.location.venueName}</p>
                    <p>
                      {eventDetails.location.address}, {eventDetails.location.city}, {eventDetails.location.state}{" "}
                      {eventDetails.location.zipCode}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Start Date</h4>
                  <p>{formatDate(eventDetails.eventStartDay)}</p>
                </div>
                <div>
                  <h4 className="font-medium">End Date</h4>
                  <p>{formatDate(eventDetails.eventEndDay)}</p>
                </div>
                <div>
                  <h4 className="font-medium">Start Time</h4>
                  <p>{eventDetails.eventStartTime}</p>
                </div>
                <div>
                  <h4 className="font-medium">End Time</h4>
                  <p>{eventDetails.eventEndTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Event Photos</h3>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-primary"
                onClick={() => onEdit("photos")}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-medium">Cover Photo</h4>
                {eventImages.coverPhoto && (
                  <div className="mt-2 h-[200px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={URL.createObjectURL(eventImages.coverPhoto) || "/placeholder.svg"}
                      alt="Cover photo"
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              {eventImages.sampleFeedPhotos && eventImages.sampleFeedPhotos.length > 0 && (
                <div>
                  <h4 className="font-medium">Sample Feed Photos</h4>
                  <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                    {eventImages.sampleFeedPhotos.map((photo, index) => (
                      <div key={index} className="h-[100px] overflow-hidden rounded-lg">
                        <Image
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Feed photo ${index + 1}`}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Experience Moments Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Experience Moments</h3>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-primary"
                onClick={() => onEdit("experienceMoments")}
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="mt-4">
              <p>
                {experienceMoments.active
                  ? "Experience Moments are enabled for this event."
                  : "Experience Moments are not enabled for this event."}
              </p>
              {experienceMoments.active && (
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Recurrence</h4>
                    <p>{experienceMoments.recurrence} days</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Duration</h4>
                    <p>{experienceMoments.duration} minutes</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button className="w-[160px]" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button className="w-[160px]" onClick={onSubmit}>
            Submit Event
          </Button>
        </div>
      </div>
    </div>
  )
}

