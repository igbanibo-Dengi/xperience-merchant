'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ReviewStepProps {
  eventData: any
  onSubmit: () => void
  onBack: () => void
  onEdit: (step: string) => void
}

export function ReviewStep({
  eventData,
  onSubmit,
  onBack,
  onEdit,
}: ReviewStepProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold md:text-[32px]">
        Review your event
      </h2>
      <p className="mb-8">
        Review your event details carefully to confirm accuracy. Make any
        necessary adjustments before proceeding.
      </p>

      <div className="space-y-8">
        <div className="border-none p-0">
          <div className="flex items-center justify-between p-0">
            <p className="text-lg font-bold">Event Details</p>
            <Button
              variant="link"
              onClick={() => onEdit('details')}
              className="font-semibold underline"
            >
              Edit Details
            </Button>
          </div>
          <div className="mt-4 p-0">
            <div className="space-y-2 text-base text-muted-foreground">
              <p>{eventData.details.name}</p>
              <p>{eventData.details.description}</p>
            </div>

            <div>
              <span className="mt-4 flex items-center justify-between">
                <p className="text-lg font-bold">Venue Location</p>
                <Button
                  variant="link"
                  onClick={() => onEdit('details')}
                  className="font-semibold underline"
                >
                  Edit Details
                </Button>
              </span>

              <p>
                {eventData.details.venue.name}
                <br />
                {eventData.details.venue.address}
                <br />
                {eventData.details.venue.city}, {eventData.details.venue.state}{' '}
                {eventData.details.venue.zipCode}
                {eventData.details.startDate} {eventData.details.startTime} -{' '}
                {eventData.details.endDate} {eventData.details.endTime}
              </p>
            </div>
          </div>
        </div>

        <div className="border-none p-0">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Cover Photo</p>
            <Button
              variant="link"
              onClick={() => onEdit('photos')}
              className="font-semibold underline"
            >
              Edit Details
            </Button>
          </div>
          <div className="p-0">
            {eventData.photos.coverPhoto && (
              <div className="relative h-[200px] w-[340px] md:h-[350px] md:w-[660px] xl:h-[400px] xl:w-[800px]">
                <Image
                  src={URL.createObjectURL(eventData.photos.coverPhoto)}
                  alt="Cover Photo"
                  // width={700} height={500}
                  fill
                  className="mx-auto mb-4 mt-4 rounded-lg"
                />
              </div>
            )}
            <div className="mt-10 flex items-center justify-between">
              <p className="text-lg font-bold">Feed Photos</p>
              <Button
                variant="link"
                onClick={() => onEdit('photos')}
                className="font-semibold underline"
              >
                Edit Details
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {eventData.photos.feedPhotos.map((photo: File, index: number) => (
                <div
                  className="group relative size-[160px] md:size-[300px] xl:size-[180px]"
                  key={index}
                >
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
            <Button
              variant="outline"
              onClick={() => onEdit('photos')}
              className="mt-4"
            >
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
                <ul className="mt-2 list-disc pl-5">
                  {eventData.experienceMoments.moments.map(
                    (moment: any, index: number) => (
                      <li key={index}>
                        {moment.startTime} - {moment.endTime}
                      </li>
                    )
                  )}
                </ul>
              </>
            ) : (
              <p>Xperience Moments are not enabled for this event.</p>
            )}
            <Button
              variant="outline"
              onClick={() => onEdit('experienceMoments')}
              className="mt-4"
            >
              Edit Xperience Moments
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          className="w-[160px]"
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button className="w-[160px]" type="submit" onClick={onSubmit}>
          Publish Event
        </Button>
      </div>
    </div>
  )
}
