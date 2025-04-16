'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function getAllPlans() {
  try {
    const url = `${process.env.BASE_URL}/plan`

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
    console.error('Error in get plans action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function getUserPlan() {
  try {
    const url = `${process.env.BASE_URL}/plan/user`

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
    console.error('Error in get plans action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}


export const getPlanById = async (planId: string) => {
  try {
    const url = `${process.env.BASE_URL}/plan/${planId}`

    const response = await fetch(url, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in getPlanById action:', error)
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export const assignPlanToUser = async (planId: string) => {
  try {

    const url = `${process.env.BASE_URL}/plan/select`

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
      body: JSON.stringify({ planId }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Error response:', error)
      return {
        error: error.message || 'An error occurred during plan assignment.',
      }
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Error in assignPlanToUser action:', error)
    return NextResponse.json(
      { message: 'Failed to assign plan to user' },
      { status: 500 }
    )

  }
}