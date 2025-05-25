'use client'

import { toast } from '@/hooks/use-toast'
import { addWatermark } from '@/lib/actions/watermark.action'
import { Event, EventMedia } from '@/types/event'
import { ChevronLeft, ChevronRight, Download, ImageIcon, VideoIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from '../ui/badge'

interface EventOverviewProps {
  event: Event
  initialEventMedia: EventMedia[]
  eventId: string
}

export default function EventPhotos({ initialEventMedia }: EventOverviewProps) {
  const [eventMedia] = useState<EventMedia[]>(initialEventMedia)
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const openMediaViewer = (mediaIndex: number) => {
    setSelectedMediaIndex(mediaIndex)
    setCurrentItemIndex(0)
    setIsMediaViewerOpen(true)
  }

  const closeMediaViewer = () => {
    setIsMediaViewerOpen(false)
  }

  const goToPreviousMedia = () => {
    setSelectedMediaIndex((prev) => {
      const newIndex = prev === 0 ? eventMedia.length - 1 : prev - 1
      setCurrentItemIndex(0)
      return newIndex
    })
  }

  const goToNextMedia = () => {
    setSelectedMediaIndex((prev) => {
      const newIndex = (prev + 1) % eventMedia.length
      setCurrentItemIndex(0)
      return newIndex
    })
  }

  const selectMediaItem = (index: number) => {
    setCurrentItemIndex(index)
  }

  const downloadImage = async (url: string) => {
    if (!url) {
      toast({
        title: "Error",
        description: "Media URL is missing",
        variant: "destructive",
      })
      return
    }

    try {
      setIsDownloading(true)
      const base64Image = await addWatermark(url)
      const link = document.createElement("a")
      link.href = base64Image
      link.download = `watermarked-${url.substring(url.lastIndexOf("/") + 1)}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading media:", error)
      toast({
        title: "Download Failed",
        description: "There was an error adding the watermark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const isVideo = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.mov') || url.includes('video')
  }

  const currentMedia = eventMedia[selectedMediaIndex] || null
  const currentMediaUrl = currentMedia?.mediaUrl?.[currentItemIndex] || null
  const hasMultipleItems = currentMedia?.mediaUrl?.length > 1 || false
  const currentIsVideo = currentMediaUrl ? isVideo(currentMediaUrl) : false

  const renderMediaThumbnail = (url: string) => {
    if (isVideo(url)) {
      return (
        <div className="relative w-full h-full">
          <video
            src={url}
            className="w-full h-full object-cover rounded-lg"
            muted
            playsInline
            disablePictureInPicture
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <VideoIcon className="h-8 w-8 text-white" />
          </div>
        </div>
      )
    }
    return (
      <Image
        src={url || "/placeholder.svg"}
        alt="Media thumbnail"
        fill
        className="object-cover"
        loading="lazy"
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
      />
    )
  }

  const renderMediaPreview = (url: string) => {
    if (isVideo(url)) {
      return (
        <video
          src={url}
          className="object-contain max-h-[70vh] max-w-full"
          controls
          playsInline
        />
      )
    }
    return (
      <Image
        src={url || "/placeholder.svg"}
        alt={currentMedia?.caption || "Event media"}
        width={1200}
        height={800}
        className="object-contain max-h-[70vh] max-w-full"
        priority
        onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {eventMedia.map((media, index) => (
        <div
          key={`featured-${media._id}-${index}`}
          className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => openMediaViewer(index)}
        >
          {renderMediaThumbnail(media.mediaUrl[0])}

          {media.mediaUrl.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs flex items-center">
              {isVideo(media.mediaUrl[0]) ? (
                <VideoIcon className="h-3 w-3 mr-1" />
              ) : (
                <ImageIcon className="h-3 w-3 mr-1" />
              )}
              <span>{media.mediaUrl.length}</span>
            </div>
          )}
        </div>
      ))}

      {/* Media Viewer Dialog */}
      <Dialog open={isMediaViewerOpen} onOpenChange={setIsMediaViewerOpen}>
        <DialogContent className="max-w-full min-w-full bg-black/90 border-none p-0">
          <DialogTitle className="sr-only">Media Viewer</DialogTitle>
          <div className="relative h-screen flex flex-col items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeMediaViewer}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main media display */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4">
              {currentMediaUrl ? (
                renderMediaPreview(currentMediaUrl)
              ) : (
                <div className="text-white">No media available</div>
              )}

              {/* Media navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={goToPreviousMedia}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={goToNextMedia}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            {/* Media info and controls */}
            <div className="bg-white text-black p-4 rounded-lg w-full max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <p className="font-medium">{currentMedia?.caption || "No caption"}</p>
                <div className="mt-2 text-xs text-gray-500 flex mr-4 justify-between">
                  <span>
                    Media {selectedMediaIndex + 1} of {eventMedia.length}
                  </span>
                  {hasMultipleItems && (
                    <span>
                      Item {currentItemIndex + 1} of {currentMedia?.mediaUrl?.length}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 mt-2 justify-between">
                <div className="flex gap-1">
                  {currentMedia?.hashtags?.map((tag, index) => (
                    <Badge key={`tag-${index}`} className="text-xs h-6 font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => !currentIsVideo && downloadImage(currentMediaUrl || "")}
                    disabled={isDownloading || !currentMediaUrl || currentIsVideo}
                  >
                    {isDownloading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Thumbnail navigation for multiple items */}
            {hasMultipleItems && currentMedia?.mediaUrl && (
              <div className="w-full flex justify-center mb-8 px-4">
                <div className="bg-black/50 p-2 rounded-lg flex gap-2 overflow-x-auto max-w-full">
                  {currentMedia.mediaUrl.map((url, itemIndex) => (
                    <button
                      key={`thumb-${itemIndex}`}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${currentItemIndex === itemIndex ? "border-white" : "border-transparent"
                        }`}
                      onClick={() => selectMediaItem(itemIndex)}
                    >
                      {isVideo(url) ? (
                        <div className="relative w-full h-full">
                          <video
                            src={url}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <VideoIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Thumbnail ${itemIndex + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}