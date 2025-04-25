import { Button } from '@/components/ui/button'
import { Event } from '@/types/event'
import { PhoneOutgoing, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const pexelsImages = [
  // Original 10
  'https://images.pexels.com/photos/3184193/pexels-photo-3184193.jpeg',
  'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg',
  'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg',
  'https://images.pexels.com/photos/2566581/pexels-photo-2566581.jpeg',
  'https://images.pexels.com/photos/3771847/pexels-photo-3771847.jpeg',
  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
  'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
  'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg',
  'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg',

  // Extra for "Recently Uploaded Photos"
  'https://images.pexels.com/photos/4666759/pexels-photo-4666759.jpeg',
  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  'https://images.pexels.com/photos/5910833/pexels-photo-5910833.jpeg',
  'https://images.pexels.com/photos/5081919/pexels-photo-5081919.jpeg',
  'https://images.pexels.com/photos/4968394/pexels-photo-4968394.jpeg',
  'https://images.pexels.com/photos/5838426/pexels-photo-5838426.jpeg',
  'https://images.pexels.com/photos/5235122/pexels-photo-5235122.jpeg',
  'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg',
  'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
  'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
]

export default function EventOverview({ event }: { event: Event }) {
  return (
    <section className="">
      <div className="space-y-8">
        {/* Next Xperience Moment */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Next Xperience Moment</h2>
          <div className="mb-4 rounded-lg bg-blue-50 p-4">
            <p className="text-blue-600">
              Xperience Moments will automatically go live at their scheduled time.
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
              {pexelsImages.slice(6, 18).map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`${url}?auto=compress&cs=tinysrgb&dpr=2&h=500&w=500`}
                    alt={`Uploaded Photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}

            </div>
            <Button className="ml-auto w-full lg:hidden">Review</Button>
          </div>
        </div>

        {/* Recently Uploaded Photos */}
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
              {pexelsImages.slice(6, 11).map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={`${url}?auto=compress&cs=tinysrgb&dpr=2&h=500&w=500`}
                    alt={`Uploaded Photo ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <Button className="ml-auto w-full lg:hidden">
              View All Photos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
