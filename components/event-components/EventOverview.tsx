import { Button } from '@/components/ui/button'
import { PhoneOutgoing, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function EventOverview() {
  return (
    <section className="mt-10 grid gap-10 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Next Xperience Moment</h2>
          <div className="mb-4 rounded-lg bg-blue-50 p-4">
            <p className="text-blue-600">
              Xperience Moments will automatically go live at their scheduled
              time.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold md:text-xl">
                7:30 PM - 7:35 PM
              </p>
              <Button className="ml-auto hidden w-[150px] lg:block">
                Review
              </Button>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
            <Button className="ml-auto w-full lg:hidden">Review</Button>
          </div>
        </div>
        <div>
          <div className="rounded-lg border p-4">
            <div className="mb-4 flex w-full flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg font-semibold md:text-xl">
                Recently Uploaded Photos
              </h2>
              <Button className="ml-auto hidden w-[150px] lg:block">
                View All Photos
              </Button>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-gray-200"
                ></div>
              ))}
            </div>
            <Button className="ml-auto w-full lg:hidden">
              View All Photos
            </Button>
          </div>
        </div>
      </div>
      {/* ANALYTICS */}

      <div>
        <span className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <Button
            className="h-fit max-h-[10px] text-lg font-semibold text-foreground underline hover:text-primary"
            variant={'link'}
            asChild
          >
            <Link href="#">View All</Link>
          </Button>
        </span>

        <div>
          <div className="mb-4 flex items-center justify-between rounded-lg border p-4">
            <span className="flex items-center gap-2">
              <PhoneOutgoing />
              <p>Photos Uploaded:</p>
            </span>
            <p className="font-bold">9087</p>
          </div>
          <div className="mb-4 flex items-center justify-between rounded-lg border p-4">
            <span className="flex items-center gap-2">
              <User />
              <p>Live Users:</p>
            </span>
            <p className="font-bold">3223</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 items-start justify-between rounded-lg border bg-blue-50 p-4">
          <span>
            <p className="text-lg font-semibold">Scan QR Code</p>
            <p>For a quick glance at the attendee side, scan here.</p>
          </span>
          <div className="relative aspect-square h-full w-full">
            <Image src="/barcode.jpg" alt="event barcode" fill />
          </div>
        </div>
      </div>
    </section>
  )
}
