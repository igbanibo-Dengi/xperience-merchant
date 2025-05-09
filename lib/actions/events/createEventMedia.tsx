'use server'


type EventUploadData = {
  eventId: string
  attendeeId: string | undefined
  mediaType: string
  caption: string
  hashtags: string[]
  mediaUrl: string[] | null
}

export const createEventMedia = async (formData: EventUploadData) => {
  try {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      return {
        success: false,
        status: 500,
        message: 'BASE_URL environment variable is not configured',
      }
    }
    const endpoint = `${baseUrl}/media`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      // console.log(
      //   'Status:', response.status,
      //   'Message:', result.message || 'Failed create event media',
      // );
      return {
        success: false,
        status: response.status,
        message: result.message || 'Failed create event media',
      }
    }

    return {
      success: true,
      status: response.status,
      message: result.message || 'Event media created successfully',
      data: result.data,
    }


  } catch (error) {
    console.error("Error creating event media:", error);
    return {
      success: false,
      status: 500,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}