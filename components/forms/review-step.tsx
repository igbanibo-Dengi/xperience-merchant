"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ReviewStepProps {
  eventData: any
  onSubmit: () => void
  onBack: () => void
  onEdit: (step: string) => void
}

export function ReviewStep({ eventData, onSubmit, onBack, onEdit }: ReviewStepProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-[32px] font-bold mb-4">Review your event</h2>
      <p className="mb-8">
        Review your event details carefully to confirm accuracy. Make any necessary adjustments before
        proceeding.
      </p>

      <div className="space-y-8">
        <div className="border-none p-0">
          <div className="p-0 flex items-center justify-between">
            <p className="text-lg font-bold">Event Details</p>
            <Button variant="link" onClick={() => onEdit("details")} className="underline font-semibold">
              Edit Details
            </Button>
          </div>
          <div className="p-0 mt-4">
            <div className="text-base text-muted-foreground space-y-2">
              <p>{eventData.details.name}</p>
              <p>{eventData.details.description}</p>
            </div>

            <div>
              <span className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold">Venue Location</p>
                <Button variant="link" onClick={() => onEdit("details")} className="underline font-semibold">
                  Edit Details
                </Button>
              </span>

              <p>
                {eventData.details.venue.name}<br />
                {eventData.details.venue.address}<br />
                {eventData.details.venue.city}, {eventData.details.venue.state} {eventData.details.venue.zipCode}
                {eventData.details.startDate} {eventData.details.startTime} - {eventData.details.endDate} {eventData.details.endTime}
              </p>
            </div>
          </div>
        </div>

        <div className="p-0 border-none">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Cover Photo</p>
            <Button variant="link" onClick={() => onEdit("photos")} className="underline font-semibold">
              Edit Details
            </Button>
          </div>
          <div className="p-0">
            {eventData.photos.coverPhoto && (
              <div className="w-[340px] h-[200px] md:w-[660px] md:h-[350px] xl:w-[800px] xl:h-[400px] relative">
                <Image
                  src={URL.createObjectURL(eventData.photos.coverPhoto)}
                  alt="Cover Photo"
                  // width={700} height={500}
                  fill
                  className="rounded-lg mb-4 mx-auto mt-4"
                />
              </div>
            )}
            <div className="flex items-center justify-between mt-10">
              <p className="text-lg font-bold">Feed Photos</p>
              <Button variant="link" onClick={() => onEdit("photos")} className="underline font-semibold">
                Edit Details
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {eventData.photos.feedPhotos.map((photo: File, index: number) => (
                <div className="relative group size-[160px] md:size-[300px] xl:size-[180px] " key={index}>
                  <Image

                    src={URL.createObjectURL(photo)}
                    alt={`Feed Photo ${index + 1}`}
                    // width={200} height={200}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => onEdit("photos")} className="mt-4">
              Edit Photos
            </Button>
          </div>
        </div>

        <div>
          <div>
            <p>Xperience Moments</p>
          </div>
          <div>
            {eventData.experienceMoments.enabled ? (
              <>
                <p>Xperience Moments are enabled for this event.</p>
                <ul className="list-disc pl-5 mt-2">
                  {eventData.experienceMoments.moments.map((moment: any, index: number) => (
                    <li key={index}>
                      {moment.startTime} - {moment.endTime}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Xperience Moments are not enabled for this event.</p>
            )}
            <Button variant="outline" onClick={() => onEdit("experienceMoments")} className="mt-4">
              Edit Xperience Moments
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button className="w-[160px]" type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="w-[160px]" type="submit" onClick={onSubmit}>Publish Event</Button>
      </div>
    </div>
  )
}

