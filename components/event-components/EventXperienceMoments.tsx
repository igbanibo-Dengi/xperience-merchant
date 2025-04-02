'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { InfoIcon as InfoCircle } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Event } from '@/types/event'

interface TimeSlot {
  startTime: string
  endTime: string
  images: string[]
}

const timeSlots: TimeSlot[] = [
  {
    startTime: '7:30 PM',
    endTime: '7:35 PM',
    images: Array(6).fill('/images/swift.jpg'),
  },
  {
    startTime: '8:15 PM',
    endTime: '8:20 PM',
    images: Array(6).fill('/images/swift.jpg'),
  },
  {
    startTime: '8:55 PM',
    endTime: '9:00 PM',
    images: Array(6).fill('/images/swift.jpg'),
  },
  {
    startTime: '10:00 PM',
    endTime: '10:05 PM',
    images: Array(6).fill('/images/swift.jpg'),
  },
]
export default function XperienceMoments({ event }: { event: Event }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  )
  const [transitionTime, setTransitionTime] = useState('5')
  const [photosPerSlide, setPhotosPerSlide] = useState('6')
  const [startTime, setStartTime] = useState(selectedTimeSlot?.startTime || '')
  const [endTime, setEndTime] = useState(selectedTimeSlot?.endTime || '')
  const isDesktop = useMediaQuery('(min-width: 540px)')

  const handleReviewClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setStartTime(timeSlot.startTime)
    setEndTime(timeSlot.endTime)
    setIsModalOpen(true)
  }

  const ModalContent = () => (
    <div className="space-y-6 overflow-y-auto py-4 pl-4 pr-4">
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
        <p className="mb-2 font-semibold">5 second transition between slides</p>
        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={'outline'}
              className="border border-border text-foreground"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      {/* Photos Per Slide */}
      <div>
        <p className="mb-2 font-semibold">8 photos per slide</p>
        <div className="grid grid-cols-5 gap-4">
          {[2, 4, 8, 10, 12].map((num) => (
            <Button
              key={num}
              variant={'outline'}
              className="border border-border text-foreground"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-4">
        <h3 className="font-semibold">Preview</h3>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src="/images/swift.jpg"
                alt={`Preview ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submitted Photos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Submitted Photos</h3>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-lg border p-4 sm:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src="/images/swift.jpg"
                alt={`Submitted ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:max-w-4xl">
      <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4">
        <InfoCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
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
          <DialogContent className="h-[90vh] md:max-w-6xl">
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
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{timeSlot.startTime}</span>
          <span className="text-muted-foreground">|</span>
          <span className="font-semibold">{timeSlot.endTime}</span>
        </div>
        <Button
          onClick={onReviewClick}
          // variant={""}
          size={'sm'}
          className="ml-auto hidden w-[140px] md:block"
        >
          Review
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="grid flex-1 grid-cols-3 gap-2 md:grid-cols-6">
          {timeSlot.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src={image}
                alt={`Moment ${index + 1}`}
                className="h-full w-full object-cover"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
        <Button
          onClick={onReviewClick}
          className="ml-auto w-full md:hidden md:w-auto"
        >
          Review
        </Button>
      </div>
    </div>
  )
}
