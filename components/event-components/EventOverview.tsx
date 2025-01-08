import { Button } from "@/components/ui/button"
import { PhoneOutgoing, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventOverview() {
  return (
    <section className="mt-10 gap-10 grid lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Next Xperience Moment</h2>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-blue-600">Xperience Moments will automatically go live at their scheduled time.</p>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg md:text-xl font-semibold">7:30 PM - 7:35 PM</p>
              <Button className="w-[150px] ml-auto hidden lg:block">Review</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <Button className="w-full ml-auto lg:hidden">Review</Button>
          </div>
        </div>
        <div>
          <div className="border p-4 rounded-lg">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-lg md:text-xl font-semibold">Recently Uploaded Photos</h2>
              <Button className="w-[150px] ml-auto hidden lg:block">View All Photos</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <Button className="w-full ml-auto lg:hidden">View All Photos</Button>
          </div>
        </div>
      </div>
      {/* ANALYTICS */}

      <div>
        <span className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <Button className="underline text-foreground font-semibold h-fit max-h-[10px] text-lg hover:text-primary" variant={"link"} asChild>
            <Link href="#">
              View All
            </Link>
          </Button>
        </span>

        <div>
          <div className="p-4 rounded-lg mb-4 flex items-center justify-between  border">
            <span className="flex items-center gap-2">
              <PhoneOutgoing />
              <p>Photos Uploaded:</p>
            </span>
            <p className="font-bold">9087</p>
          </div>
          <div className="p-4 rounded-lg mb-4 flex items-center justify-between  border">
            <span className="flex items-center gap-2">
              <User />
              <p>Live Users:</p>
            </span>
            <p className="font-bold">3223</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-4 grid grid-cols-2 items-start justify-between border">
          <span>
            <p className="text-lg font-semibold">
              Scan QR Code
            </p>
            <p>
              For a quick glance at the attendee side, scan here.
            </p>
          </span>
          <div className="aspect-square relative w-full h-full">
            <Image
              src='/barcode.jpg'
              alt="event barcode"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}
