'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function getAllEvents() {
  try {
    const url = `${process.env.BASE_URL}/event`

    const cookieStore = await cookies()
    const token = cookieStore.get('xperience_auth_token')?.value

    // console.log(token);

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error in getAllEvents action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
