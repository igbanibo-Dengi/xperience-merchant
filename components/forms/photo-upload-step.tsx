"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { photoSchema } from "@/lib/schema"
import Image from "next/image"
import { Separator } from "../ui/separator"

interface PhotoUploadStepProps {
  defaultValues?: {
    coverPhoto?: File | null
    feedPhotos?: File[]
  }
  onSubmit: (data: any) => void
  onBack: () => void
}

export function PhotoUploadStep({ defaultValues, onSubmit, onBack }: PhotoUploadStepProps) {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [feedPreviews, setFeedPreviews] = useState<string[]>([])

  const form = useForm({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      coverPhoto: defaultValues?.coverPhoto || null,
      feedPhotos: defaultValues?.feedPhotos || [],
    },
  })

  // Initialize previews if defaultValues exist
  useEffect(() => {
    if (defaultValues?.coverPhoto) {
      const reader = new FileReader()
      reader.onload = () => {
        setCoverPreview(reader.result as string)
      }
      reader.readAsDataURL(defaultValues.coverPhoto)
    }

    if (defaultValues?.feedPhotos?.length) {
      Promise.all(
        defaultValues.feedPhotos.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        })
      ).then(setFeedPreviews)
    }
  }, [defaultValues])

  const onDrop = useCallback((acceptedFiles: File[], type: "cover" | "feed") => {
    if (type === "cover") {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setCoverPreview(reader.result as string)
          form.setValue("coverPhoto", file, { shouldValidate: true })
        }
        reader.readAsDataURL(file)
      }
    } else {
      const currentFiles = form.getValues("feedPhotos") || []
      const newFiles = [...currentFiles]
      const newPreviews = [...feedPreviews]

      acceptedFiles.forEach((file) => {
        if (newFiles.length < 5) {
          const reader = new FileReader()
          reader.onload = () => {
            newPreviews.push(reader.result as string)
            setFeedPreviews(newPreviews)
          }
          reader.readAsDataURL(file)
          newFiles.push(file)
        }
      })

      form.setValue("feedPhotos", newFiles, { shouldValidate: true })
    }
  }, [form, feedPreviews])

  const removeCoverPhoto = () => {
    form.setValue("coverPhoto", null, { shouldValidate: true })
    setCoverPreview(null)
  }

  const removeFeedPhoto = (index: number) => {
    const currentFiles = form.getValues("feedPhotos")
    const newFiles = [...currentFiles]
    newFiles.splice(index, 1)
    form.setValue("feedPhotos", newFiles, { shouldValidate: true })

    const newPreviews = [...feedPreviews]
    newPreviews.splice(index, 1)
    setFeedPreviews(newPreviews)
  }

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "cover"),
    accept: { "image/*": [] },
    maxFiles: 1,
  })

  const { getRootProps: getFeedRootProps, getInputProps: getFeedInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, "feed"),
    accept: { "image/*": [] },
    maxFiles: 5,
  })

  const feedPhotosCount = form.watch("feedPhotos")?.length || 0

  return (
    <div className="max-w-2xl xl:max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit({ photos: data }))} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Cover Photo</h2>
            <p className="text-muted-foreground">
              Add a cover photo to show what your event will be about. Recommended size is 1920x1080.
            </p>
            <FormField
              control={form.control}
              name="coverPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {!coverPreview ? (
                      <div
                        {...getCoverRootProps()}
                        className="mt-2 flex justify-center rounded-lg border w-full max-w-[100%] mx-auto px-6 py-10"
                      >
                        <div className="text-center">
                          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                            >
                              <div className="flex flex-col gap-2 relative">
                                <ImagePlus className="text-foreground mx-auto" size={62} strokeWidth={1} />
                                <p className="text-muted-foreground">Drag a photo here</p>
                                <span className="flex items-center gap-2 mx-auto text-muted-foreground">
                                  <Separator className="w-20" />
                                  or
                                  <Separator className="w-20" />
                                </span>
                                <Button className="bg-blue-400 hover:bg-blue-400/70">Select from computer</Button>
                              </div>
                              <input {...getCoverInputProps()} />
                            </label>
                          </div>
                          {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                        </div>
                      </div>
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {coverPreview && (
              <div className="mt-4 relative group mx-auto w-[340px] h-[200px] md:w-[660px] md:h-[350px] xl:w-[800px] xl:h-[400px]">
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  // width={670}
                  // height={400}
                  fill
                  className="rounded-lg mx-auto"
                />
                <button
                  type="button"
                  onClick={removeCoverPhoto}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white transition-opacity"
                  aria-label="Remove cover photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Feed Photos</h2>
            <p className="text-muted-foreground mb-8">
              Insert sample feed photos to showcase to your attendees. You can add up to 4 photos.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {feedPreviews.length > 0 && (
                <div className="grid grid-cols-2 xl:grid-cols-4 xl:flex gap-4 md:gap-4 place-items-center w-fit items-center">
                  {feedPreviews.map((preview, index) => (
                    <div key={index} className="relative group size-[160px] md:size-[300px] xl:size-[180px] ">
                      <Image
                        src={preview}
                        alt={`Feed preview ${index + 1}`}
                        fill
                        className="rounded-lg object-cover object-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeedPhoto(index)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-red-600/70 text-white transition-opacity"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}


              <FormField
                control={form.control}
                name="feedPhotos"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <FormControl>
                      {feedPhotosCount < 4 && (
                        <div className="w-fit">
                          <div
                            {...getFeedRootProps()}
                            className="w-fit"
                          >
                            <label
                              htmlFor="file-upload"
                            // className="w-full border p-8 rounded-lg text-center cursor-pointer"
                            >
                              <span className="xl:hidden flex flex-col items-center justify-center text-foreground font-normal text-center w-full border border-[#9D9A98] rounded-lg p-4">
                                <p>Add Photo</p>
                                <input {...getFeedInputProps()} />
                              </span>
                            </label>
                          </div>
                          <div
                            {...getFeedRootProps()}
                            className="hidden xl:flex justify-center size-[160px] md:size-[300px] xl:size-[180px]   rounded-lg border px-6 py-10"
                          >
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                                >
                                  {/* <span>{feedPhotosCount === 0 ? "Upload files" : "Add more images"}</span> */}
                                  <span className="flex flex-col items-center justify-center text-foreground font-normal">

                                    <ImagePlus size={62} strokeWidth={1} />
                                    <p>Add</p>
                                    <input {...getFeedInputProps()} />
                                  </span>
                                </label>
                              </div>
                              {/* <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB ({5 - feedPhotosCount} remaining)
                          </p> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>


          <div className="flex justify-between">
            <Button className="w-[160px]" type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button className="w-[160px]" type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
