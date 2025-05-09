'use server'


import { EventMedia, EventMediaResponse } from "@/types/event";
import { NextResponse } from "next/server";

/**
 * Fetches all media for a specific event with pagination
 * @param eventId The ID of the event to fetch media for
 * @param page The page number to fetch (starting from 1)
 * @param limit The number of items per page
 * @returns An object containing the media data or a NextResponse in case of error
 */
export async function getEventMedia(
  eventId: string,
  page = 1,
  limit = 12,
): Promise<{ data: EventMedia[]; hasMore: boolean } | NextResponse> {
  try {
    if (!eventId) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 })
    }

    const url = `${process.env.BASE_URL}/media/event/${eventId}?page=${page}&limit=${limit}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: "Event media not found" }, { status: 404 })
      }
      throw new Error(`Failed to fetch event media: ${response.status} ${response.statusText}`)
    }

    const result: EventMediaResponse = await response.json()

    if (!result.success || !result.data) {
      throw new Error("Invalid response structure")
    }

    const hasMore = result.data.length === limit

    // Return the data in the expected format
    return {
      data: result.data,
      hasMore,
    }
  } catch (error) {
    console.error("Error in getEventMedia action:", error)
    return NextResponse.json(
      {
        message: "Failed to fetch event media",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
