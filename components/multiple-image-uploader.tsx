'use client'

import { uploadMultipleImages } from '@/lib/actions/upload-multiple-images'
import { useState, useRef } from 'react'

export default function MultipleImageUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    mediaUrls?: string[]
  } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    setResult(null)

    try {
      const response = await uploadMultipleImages(formData)

      if (response.success && response.data?.mediaUrl) {
        setResult({
          success: true,
          message: response.message,
          mediaUrls: response.data.mediaUrl,
        })
      } else {
        setResult({
          success: false,
          message: response.message,
        })
      }

      // Reset the form if upload was successful
      if (response.success && formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Upload Multiple Images</h2>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="images" className="block text-sm font-medium">
            Select Images
          </label>
          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            You can select multiple images by holding Ctrl (or Cmd on Mac) while
            selecting files
          </p>
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 rounded-md p-4 ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          <p className="font-medium">{result.success ? 'Success!' : 'Error'}</p>
          <p className="text-sm">{result.message}</p>

          {result.mediaUrls && result.mediaUrls.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Uploaded Image URLs:</p>
              <div className="space-y-4">
                {result.mediaUrls.map((url, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-medium">
                        Image {index + 1}:
                      </span>
                      <input
                        type="text"
                        readOnly
                        value={url}
                        className="flex-1 rounded-md border bg-white p-2 text-xs"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                      />
                    </div>
                    <img
                      src={url || '/placeholder.svg'}
                      alt={`Uploaded image ${index + 1}`}
                      className="h-auto max-w-full rounded-md border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
