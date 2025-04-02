'use server'
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import type { Event } from "@/types/event"

interface EventResponse {
  success: boolean
  status: number
  message: string
  data: Event
}

export async function getEventById(eventId: string): Promise<{ data: Event } | NextResponse> {
  try {
    if (!eventId) {
      return NextResponse.json({ message: "Event ID is required" }, { status: 400 })
    }

    const url = `${process.env.BASE_URL}/event/${eventId}`
    const token = cookies().get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Ensure we get fresh data
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: "Event not found" }, { status: 404 })
      }
      throw new Error(`Failed to fetch event: ${response.status} ${response.statusText}`)
    }

    const result: EventResponse = await response.json()

    // Check if the response has the expected structure
    if (!result.success || !result.data) {
      throw new Error('Invalid response structure')
    }

    // Return the data in the expected format
    return { data: result.data }

  } catch (error) {
    console.error("Error in getEventById action:", error)
    return NextResponse.json({
      message: "Failed to fetch event details",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

