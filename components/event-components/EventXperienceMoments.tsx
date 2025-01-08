'use client'

import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from 'lucide-react'
import { useMediaQuery } from "@/hooks/use-media-query"

interface TimeSlot {
  startTime: string
  endTime: string
  images: string[]
}

const timeSlots: TimeSlot[] = [
  {
    startTime: "7:30 PM",
    endTime: "7:35 PM",
    images: Array(6).fill("/images/swift.jpg")
  },
  {
    startTime: "8:15 PM",
    endTime: "8:20 PM",
    images: Array(6).fill("/images/swift.jpg")
  },
  {
    startTime: "8:55 PM",
    endTime: "9:00 PM",
    images: Array(6).fill("/images/swift.jpg")
  },
  {
    startTime: "10:00 PM",
    endTime: "10:05 PM",
    images: Array(6).fill("/images/swift.jpg")
  }
]
export default function XperienceMoments() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [transitionTime, setTransitionTime] = useState("5")
  const [photosPerSlide, setPhotosPerSlide] = useState("6")
  const [startTime, setStartTime] = useState(selectedTimeSlot?.startTime || "")
  const [endTime, setEndTime] = useState(selectedTimeSlot?.endTime || "")
  const isDesktop = useMediaQuery("(min-width: 540px)")

  const handleReviewClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setStartTime(timeSlot.startTime)
    setEndTime(timeSlot.endTime)
    setIsModalOpen(true)
  }

  const ModalContent = () => (
    <div className="space-y-6 py-4 overflow-y-auto pl-4 pr-4">
      {/* Time Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Time</label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Time</label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      {/* Transition Settings */}
      <div>
        <p className="font-semibold mb-2">5 second transition between slides</p>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button key={num} variant={'outline'} className="border-border border text-foreground">{num}</Button>
          ))}
        </div>
      </div>

      {/* Photos Per Slide */}
      <div>
        <p className="font-semibold mb-2">8 photos per slide</p>
        <div className="grid grid-cols-5 gap-4">
          {[2, 4, 8, 10, 12].map((num) => (
            <Button key={num} variant={'outline'} className="border-border border text-foreground">{num}</Button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">Preview</h3>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src="/images/swift.jpg"
                alt={`Preview ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Photos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Submitted Photos</h3>
          <Button variant="outline" size="sm">Edit</Button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 border rounded-lg p-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src="/images/swift.jpg"
                alt={`Submitted ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="md:max-w-4xl space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
        <InfoCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Xperience Moments will automatically go live at their scheduled time.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Next Xperience Moment</h2>
        {timeSlots.slice(0, 1).map((slot, index) => (
          <TimeSlotRow
            key={index}
            timeSlot={slot}
            onReviewClick={() => handleReviewClick(slot)}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Xperience Moments</h2>
        {timeSlots.slice(1).map((slot, index) => (
          <TimeSlotRow
            key={index}
            timeSlot={slot}
            onReviewClick={() => handleReviewClick(slot)}
          />
        ))}
      </div>

      {isDesktop ? (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="md:max-w-6xl h-[90vh] ">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle>Xperience Moment 1</DialogTitle>
              <DialogClose asChild>
                <Button variant="default">Save Changes</Button>
              </DialogClose>
            </DialogHeader>
            <ModalContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle>Xperience Moment 1</DrawerTitle>
              <DrawerClose asChild>
                <Button variant="default">Save Changes</Button>
              </DrawerClose>
            </DrawerHeader>
            {/* <div className="px-4 pb-4"> */}
            <ModalContent />
            {/* </div> */}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  )
}
interface TimeSlotRowProps {
  timeSlot: TimeSlot
  onReviewClick: () => void
}

function TimeSlotRow({ timeSlot, onReviewClick }: TimeSlotRowProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{timeSlot.startTime}</span>
          <span className="text-muted-foreground">|</span>
          <span className="font-semibold">{timeSlot.endTime}</span>
        </div>
        <Button
          onClick={onReviewClick}
          // variant={""}
          size={'sm'}
          className="ml-auto w-[140px] hidden md:block"
        >
          Review
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 flex-1">
          {timeSlot.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={image}
                alt={`Moment ${index + 1}`}
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <Button
          onClick={onReviewClick}
          className="ml-auto w-full md:w-auto md:hidden"
        >
          Review
        </Button>
      </div>
    </div>
  )
}

