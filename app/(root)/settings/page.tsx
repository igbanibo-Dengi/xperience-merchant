import ImageUploader from '@/components/ImageUpload'
import ImageUploadForm from '@/components/ImageUpload'
import MultipleImageUploader from '@/components/multiple-image-uploader'
import React from 'react'

const page = () => {
  return (
    <main className="min-h-screen p-4 md:p-24 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Image Upload Service</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Single Image Upload</h2>
            <ImageUploader />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-center mb-4">Multiple Image Upload</h2>
            <MultipleImageUploader />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page