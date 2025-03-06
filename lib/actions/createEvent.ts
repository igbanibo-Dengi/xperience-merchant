"use server"

import type { EventFormValues } from "@/lib/schema"

export async function createEvent(eventData: EventFormValues) {
  try {
    if (!process.env.BASE_URL) {
      throw new Error("Base URL is not set in environment variables.")
    }

    const url = `${process.env.BASE_URL}/api/v1/event`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: eventData.details.title,
        description: eventData.details.description,
        location: eventData.details.location,
        eventStartDay: eventData.details.eventStartDay,
        eventEndDay: eventData.details.eventEndDay,
        eventStartTime: eventData.details.eventStartTime,
        eventEndTime: eventData.details.eventEndTime,
        hashtags: eventData.details.hashtags,
        xperienceMoment: eventData.details.xperienceMoment,
        coverPhotoUrl: eventData.photos.coverPhotoUrl,
        sampleFeedPhotosUrl: eventData.photos.sampleFeedPhotosUrl,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("Error response:", error)
      return { error: error.message || "An error occurred while creating the event." }
    }

    const result = await response.json()
    return { success: true, data: result }
  } catch (error) {
    console.error("Error in create event action:", error)
    return { error: "An unexpected error occurred while trying to create the event." }
  }
}

