'use server'

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function getLoggedInUser() {
  try {
    const url = `${process.env.BASE_URL}/auth/user-info`
    const cookieStore = await cookies()
    const token = cookieStore.get('xperience_auth_token')?.value

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
    console.error('Error in get user action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}