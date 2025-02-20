'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function getAllPlans() {
  try {
    // Use a server-side environment variable instead of NEXT_PUBLIC_
    const url = `${process.env.BASE_URL}/plan`

    // Use await with cookies() as it's now asynchronous
    const token = (await cookies()).get('auth_token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
    console.error('Error in get plans action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
