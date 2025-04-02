'use client'

import { uploadImage } from '@/lib/actions/uploadImage'
import { useState, useRef } from 'react'

export default function ImageUploader() {
  const [isUploading, setIsUploading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    mediaUrl?: string
  } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setIsUploading(true)
    setResult(null)

    try {
      const response = await uploadImage(formData)

      console.log(response)

      if (response.success && response.data?.mediaUrl) {
        setResult({
          success: true,
          message: response.message,
          mediaUrl: response.data.mediaUrl,
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
      <h2 className="mb-6 text-2xl font-bold">Upload Image</h2>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="image" className="block text-sm font-medium">
            Select Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {result && (
        <div
          className={`mt-6 rounded-md p-4 ${result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
          <p className="font-medium">{result.success ? 'Success!' : 'Error'}</p>
          <p className="text-sm">{result.message}</p>

          {result.mediaUrl && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium">Uploaded Image URL:</p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  readOnly
                  value={result.mediaUrl}
                  className="w-full rounded-md border bg-white p-2 text-xs"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <img
                  src={result.mediaUrl || '/placeholder.svg'}
                  alt="Uploaded image"
                  className="mt-2 h-auto max-w-full rounded-md"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
