"use server"

type MultipleUploadResponse = {
  success: boolean
  status: number
  message: string
  data?: {
    mediaUrl: string[]
  }
}

/**
 * Server action to upload multiple images to the configured API endpoint
 * @param formData - FormData containing the image files with key 'images'
 * @returns Response with success status and array of media URLs if successful
 */
export async function uploadMultipleImages(formData: FormData): Promise<MultipleUploadResponse> {
  try {
    // Get the image files from the form data
    const imageFiles = formData.getAll("images") as File[]

    if (!imageFiles || imageFiles.length === 0) {
      return {
        success: false,
        status: 400,
        message: "No image files provided",
      }
    }

    // Check if all files are images
    const nonImageFiles = imageFiles.filter((file) => !file.type.startsWith("image/"))
    if (nonImageFiles.length > 0) {
      return {
        success: false,
        status: 400,
        message: "One or more provided files are not images",
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

    const endpoint = `${baseUrl}/convert-media/convert-images`

    // Create a new FormData instance for the fetch request
    const apiFormData = new FormData()

    // Append all image files with the same key name 'images'
    imageFiles.forEach((file) => {
      apiFormData.append("images", file)
    })

    const response = await fetch(endpoint, {
      method: "POST",
      body: apiFormData,
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: result.message || "Failed to upload images",
      }
    }

    // Return the successful response
    return {
      success: true,
      status: response.status,
      message: result.message || "Images uploaded successfully",
      data: result.data,
    }
  } catch (error) {
    console.error("Error uploading images:", error)
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

