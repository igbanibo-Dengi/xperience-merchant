'use server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function getUserEvents() {
  try {
    const url = `${process.env.BASE_URL}/event/user`

    const cookieStore = await cookies()
    const token = cookieStore.get('xperience_auth_token')?.value

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

    console.log(data)
  } catch (error) {
    console.error('Error in getUserEvents action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch user events' },
      { status: 500 }
    )
  }
}
