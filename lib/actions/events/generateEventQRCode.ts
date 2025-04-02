'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

interface QRCodeResponse {
  success: boolean
  status: number
  message: string
  data: {
    eventId: string
    qrCode: string
    _id: string
    createdAt: string
    updatedAt: string
  }
}

export async function generateEventQRCode(
  eventId: string
): Promise<{ data: QRCodeResponse['data'] } | NextResponse> {
  try {
    if (!eventId) {
      return NextResponse.json(
        { message: 'Event ID is required' },
        { status: 400 }
      )
    }

    const url = `${process.env.BASE_URL}/qrcode`
    const token = cookies().get('auth_token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
    })

    console.log(response)

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: 'Event not found' },
          { status: 404 }
        )
      }
      throw new Error(
        `Failed to generate QR code: ${response.status} ${response.statusText}`
      )
    }

    const result: QRCodeResponse = await response.json()

    console.log(result)

    // Check if the response has the expected structure
    if (!result.success || !result.data) {
      throw new Error('Invalid response structure')
    }

    // Return the QR code data
    return { data: result.data }

    console.log(result.data)
  } catch (error) {
    console.error('Error in generateEventQRCode action:', error)
    return NextResponse.json(
      {
        message: 'Failed to generate QR code',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
