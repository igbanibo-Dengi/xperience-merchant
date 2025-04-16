'use server'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { FormattedData } from '@/types/event'
// import { revalidatePath } from "next/cache"

export async function createEvent(formattedData: FormattedData) {
  try {
    const url = `${process.env.BASE_URL}/event`

    const cookieStore = await cookies()
    const token = cookieStore.get('xperience_auth_token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    // Revalidate the events page to show the new event
    // revalidatePath("/events")

    return data
  } catch (error) {
    console.error('Error in createEvent action:', error)
    return NextResponse.json(
      { message: 'Failed create Event' },
      { status: 500 }
    )
  }
}
