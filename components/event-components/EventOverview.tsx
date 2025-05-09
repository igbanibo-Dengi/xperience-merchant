"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Download, ImageIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { addWatermark } from "@/lib/actions/watermark.action"
import type { Event, EventMedia } from "@/types/event"
import { toast } from "@/hooks/use-toast"
import { Badge } from "../ui/badge"

interface EventOverviewProps {
  event: Event
  initialEventMedia: EventMedia[]
  eventId: string
}

export default function EventOverview({ event, initialEventMedia, eventId }: EventOverviewProps) {
  const router = useRouter()
  const [eventMedia] = useState<EventMedia[]>(initialEventMedia)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  // Get recent uploads (last 4 items)
  const recentUploads = [...eventMedia]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)

  const openImageViewer = (mediaIndex: number) => {
    setSelectedMediaIndex(mediaIndex)
    setCurrentImageIndex(0) // Always start with the first image
    setIsImageViewerOpen(true)
  }

  const closeImageViewer = () => {
    setIsImageViewerOpen(false)
  }

  const navigateToFeed = () => {
    router.push(`/event/${eventId}/feed`)
  }

  const goToPreviousMedia = () => {
    setSelectedMediaIndex((prev) => {
      const newIndex = prev === 0 ? eventMedia.length - 1 : prev - 1
      setCurrentImageIndex(0) // Reset to first image when changing media
      return newIndex
    })
  }

  const goToNextMedia = () => {
    setSelectedMediaIndex((prev) => {
      const newIndex = (prev + 1) % eventMedia.length
      setCurrentImageIndex(0) // Reset to first image when changing media
      return newIndex
    })
  }

  const goToPreviousImage = () => {
    if (!eventMedia[selectedMediaIndex]) return

    const mediaUrls = eventMedia[selectedMediaIndex].mediaUrl
    if (!mediaUrls || mediaUrls.length <= 1) return

    setCurrentImageIndex((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    if (!eventMedia[selectedMediaIndex]) return

    const mediaUrls = eventMedia[selectedMediaIndex].mediaUrl
    if (!mediaUrls || mediaUrls.length <= 1) return

    setCurrentImageIndex((prev) => (prev + 1) % mediaUrls.length)
  }

  const selectImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const downloadImage = async (url: string) => {
    if (!url) {
      toast({
        title: "Error",
        description: "Image URL is missing",
        variant: "destructive",
      })
      return
    }

    try {
      setIsDownloading(true)

      // Get watermarked image as base64 from server action
      const base64Image = await addWatermark(url)

      // Create a temporary link element to trigger download
      const link = document.createElement("a")
      link.href = base64Image
      link.download = `watermarked-${url.substring(url.lastIndexOf("/") + 1)}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading image:", error)
      toast({
        title: "Download Failed",
        description: "There was an error adding the watermark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }


  // Get the current media and image URL
  const currentMedia = eventMedia[selectedMediaIndex] || null
  const currentImageUrl = currentMedia?.mediaUrl?.[currentImageIndex] || null
  const hasMultipleImages = currentMedia?.mediaUrl?.length > 1 || false

  return (
    <section className="space-y-8">
      {/* Featured Photos */}
      <Card className="p-4">
        <div className="mb-4 flex w-full flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold md:text-xl">Featured Photos</h2>
          {/* <Button className="ml-auto hidden w-[150px] lg:block" onClick={navigateToFeed}>
            View Feed
          </Button> */}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {event.sampleFeedPhotosUrl.map((media, index) => (
            <div
              key={`featured-${index}`}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
            // onClick={() => openImageViewer(index)}
            >
              <Image
                src={media || "/placeholder.svg"}
                alt={`Featured Photo ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
              />
            </div>
          ))}
        </div>
        {/* <Button className="ml-auto w-full lg:hidden" onClick={navigateToFeed}>
          View Feed
        </Button> */}
      </Card>

      {/* Recently Uploaded Photos */}
      <Card className="p-4">
        <div className="mb-4 flex w-full flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold md:text-xl">Recently Uploaded Photos</h2>
          {/* <Button className="ml-auto hidden w-[150px] lg:block" onClick={navigateToFeed}>
            View All Photos
          </Button> */}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {recentUploads.map((media, index) => (
            <div
              key={`recent-${media._id || index}`}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => openImageViewer(eventMedia.findIndex((m) => m._id === media._id))}
            >
              <Image
                src={media.mediaUrl?.[0] || "/placeholder.svg"}
                alt={media.caption || `Recent Photo ${index + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
              />

              {/* Show indicator for multiple images */}
              {media.mediaUrl?.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 py-1 text-xs flex items-center">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  <span>{media.mediaUrl.length}</span>
                </div>
              )}

              {/* Show upload time */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs">
                {new Date(media.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        <Button className="ml-auto w-full lg:hidden" onClick={navigateToFeed}>
          View All Photos
        </Button>
      </Card>

      {/* Image Viewer Dialog */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-full min-w-full bg-black/90 border-none p-0">
          <DialogTitle className="sr-only">carousel</DialogTitle>
          <div className="relative h-screen flex flex-col items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={closeImageViewer}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main image display */}
            <div className="relative flex-1 w-full flex items-center justify-center p-4">
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl || "/placeholder.svg"}
                  alt={currentMedia?.caption || "Event photo"}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[70vh] max-w-full"
                  priority
                  onError={(e) => (e.currentTarget.src = "/fallback-image.png")}
                />
              ) : (
                <div className="text-white">No image available</div>
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

              {/* Image navigation buttons (only shown for media with multiple images) */}
              {/* {hasMultipleImages && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-20 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={goToPreviousImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                    onClick={goToNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )} */}
            </div>

            {/* Image info and controls */}
            <div className="bg-white text-black p-4 rounded-lg w-full max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <p className="font-medium">{currentMedia?.caption || "No caption"}</p>
                <div className="mt-2 text-xs text-gray-500 flex mr-4 justify-between">
                  <span>
                    Photo {selectedMediaIndex + 1} of {eventMedia.length}
                  </span>
                  {hasMultipleImages && (
                    <span>
                      Image {currentImageIndex + 1} of {currentMedia?.mediaUrl?.length}
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
                    onClick={() => downloadImage(currentImageUrl || "")}
                    disabled={isDownloading || !currentImageUrl}
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

            {/* Thumbnail navigation for multiple images */}
            {hasMultipleImages && currentMedia?.mediaUrl && (
              <div className="w-full flex justify-center mb-8 px-4">
                <div className="bg-black/50 p-2 rounded-lg flex gap-2 overflow-x-auto max-w-full">
                  {currentMedia.mediaUrl.map((url, imgIndex) => (
                    <button
                      key={`thumb-${imgIndex}`}
                      className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 ${currentImageIndex === imgIndex ? "border-white" : "border-transparent"
                        }`}
                      onClick={() => selectImage(imgIndex)}
                    >
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Thumbnail ${imgIndex + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
