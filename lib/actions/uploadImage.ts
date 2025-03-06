"use server"

type UploadResponse = {
  success: boolean
  status: number
  message: string
  data?: {
    mediaUrl: string
  }
}

/**
 * Server action to upload an image to the configured API endpoint
 * @param formData - FormData containing the image file with key 'image'
 * @returns Response with success status and media URL if successful
 */
export async function uploadImage(formData: FormData): Promise<UploadResponse> {
  try {
    // Get the image file from the form data
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return {
        success: false,
        status: 400,
        message: "No image file provided",
      }
    }

    // Check if it's actually an image
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        status: 400,
        message: "The provided file is not an image",
      }
    }

    const baseUrl = process.env.BASE_URL

    if (!baseUrl) {
      return {
        success: false,
        status: 500,
        message: "BASE_URL environment variable is not configured",
      }
    }

    const endpoint = `${baseUrl}/convert-media/convert-image`

    // Create a new FormData instance for the fetch request
    const apiFormData = new FormData()
    apiFormData.append("image", imageFile)

    const response = await fetch(endpoint, {
      method: "POST",
      body: apiFormData,
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: result.message || "Failed to upload image",
      }
    }

    return {
      success: true,
      status: response.status,
      message: result.message || "Image uploaded successfully",
      data: result.data,
    }
  } catch (error) {
    console.error("Error uploading image:", error)
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

