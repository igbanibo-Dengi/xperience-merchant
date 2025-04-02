import ImageUploader from '@/components/ImageUpload'
import ImageUploadForm from '@/components/ImageUpload'
import MultipleImageUploader from '@/components/multiple-image-uploader'
import { getAllEvents } from '@/lib/actions/events/getAllEvents'
import { getUserEvents } from '@/lib/actions/events/getUserEvents'
import { getAllPlans, getUserPlan } from '@/lib/actions/plans/plans.actions'
import React from 'react'

const page = async () => {
  const allPlans = await getAllPlans()

  console.log(allPlans)

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Image Upload Service
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-center text-xl font-semibold">
              Single Image Upload
            </h2>
            <ImageUploader />
          </div>

          <div>
            <h2 className="mb-4 text-center text-xl font-semibold">
              Multiple Image Upload
            </h2>
            <MultipleImageUploader />
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
