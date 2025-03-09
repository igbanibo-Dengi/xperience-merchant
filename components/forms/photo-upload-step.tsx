"use client"

import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { photoSchema } from "@/lib/schema"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import type { PhotoUploadStepProps } from "@/types/event"

export function PhotoUploadStep({ defaultValues, onSubmit, onBack }: PhotoUploadStepProps) {
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [feedPreviews, setFeedPreviews] = useState<string[]>([])

  const form = useForm({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      coverPhoto: defaultValues?.coverPhoto || null,
      sampleFeedPhotos: defaultValues?.sampleFeedPhotos || [],
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

    if (defaultValues?.sampleFeedPhotos?.length) {
      Promise.all(
        defaultValues.sampleFeedPhotos.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        }),
      ).then(setFeedPreviews)
    }
  }, [defaultValues])

  const onDrop = useCallback(
    (acceptedFiles: File[], type: "cover" | "feed") => {
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
        const currentFiles = form.getValues("sampleFeedPhotos") || []
        const newFiles = [...currentFiles]
        const newPreviews = [...feedPreviews]

        acceptedFiles.forEach((file) => {
          if (newFiles.length < 4) {
            const reader = new FileReader()
            reader.onload = () => {
              newPreviews.push(reader.result as string)
              setFeedPreviews(newPreviews)
            }
            reader.readAsDataURL(file)
            newFiles.push(file)
          }
        })

        form.setValue("sampleFeedPhotos", newFiles, { shouldValidate: true })
      }
    },
    [form, feedPreviews],
  )

  const removeCoverPhoto = () => {
    form.setValue("coverPhoto", null, { shouldValidate: true })
    setCoverPreview(null)
  }

  const removeFeedPhoto = (index: number) => {
    const currentFiles = form.getValues("sampleFeedPhotos")
    const newFiles = [...currentFiles]
    newFiles.splice(index, 1)
    form.setValue("sampleFeedPhotos", newFiles, { shouldValidate: true })

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
    maxFiles: 4,
  })

  const sampleFeedPhotosCount = form.watch("sampleFeedPhotos")?.length || 0

  const handleSubmit = (data: any) => {
    onSubmit({
      photos: {
        coverPhoto: data.coverPhoto,
        sampleFeedPhotos: data.sampleFeedPhotos,
      },
    })
  }

  return (
    <div className="mx-auto max-w-2xl xl:max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Cover Photo</h2>
            <p className="text-muted-foreground">
              Add a cover photo to show what your event will be about. Recommended size is 1920x1080.
            </p>
            <FormField
              control={form.control}
              name="coverPhoto"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormControl>
                    {!coverPreview ? (
                      <div
                        {...getCoverRootProps()}
                        className="mx-auto mt-2 flex w-full max-w-[100%] justify-center rounded-lg border px-6 py-10"
                      >
                        <div className="text-center">
                          <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                            >
                              <div className="relative flex flex-col gap-2">
                                <ImagePlus className="mx-auto text-foreground" size={62} strokeWidth={1} />
                                <p className="text-muted-foreground">Drag a photo here</p>
                                <span className="mx-auto flex items-center gap-2 text-muted-foreground">
                                  <Separator className="w-20" />
                                  or
                                  <Separator className="w-20" />
                                </span>
                                <Button className="bg-primary hover:bg-primary/90">Select from computer</Button>
                              </div>
                              <input {...getCoverInputProps()} />
                            </label>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    ) : null}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {coverPreview && (
              <div className="group relative mx-auto mt-4 h-[200px] w-[340px] md:h-[350px] md:w-[660px] xl:h-[400px] xl:w-[800px]">
                <Image
                  src={coverPreview || "/placeholder.svg"}
                  alt="Cover preview"
                  fill
                  className="mx-auto rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeCoverPhoto}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remove cover photo"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sample Feed Photos</h2>
            <p className="mb-8 text-muted-foreground">
              Insert sample feed photos to showcase to your attendees. You can add up to 4 photos.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {feedPreviews.length > 0 && (
                <div className="grid w-full grid-cols-2 place-items-center items-center gap-4 md:gap-4 xl:flex xl:grid-cols-4">
                  {feedPreviews.map((preview, index) => (
                    <div key={index} className="group relative size-[160px] md:size-[300px] xl:size-[180px]">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Feed preview ${index + 1}`}
                        fill
                        className="rounded-lg object-cover object-center"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeedPhoto(index)}
                        className="absolute right-2 top-2 rounded-full bg-red-600/70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <FormField
                control={form.control}
                name="sampleFeedPhotos"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="w-fit">
                    <FormControl>
                      {sampleFeedPhotosCount < 4 && (
                        <div className="w-fit">
                          <div {...getFeedRootProps()} className="w-fit">
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <span className="flex w-full flex-col items-center justify-center rounded-lg border border-muted p-4 text-center font-normal text-foreground xl:hidden">
                                <p>Add Photo</p>
                                <input {...getFeedInputProps()} />
                              </span>
                            </label>
                          </div>
                          <div
                            {...getFeedRootProps()}
                            className="hidden size-[160px] justify-center rounded-lg border px-6 py-10 md:size-[300px] xl:flex xl:size-[180px]"
                          >
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                                >
                                  <span className="flex flex-col items-center justify-center font-normal text-foreground">
                                    <ImagePlus size={62} strokeWidth={1} />
                                    <p>Add</p>
                                    <input {...getFeedInputProps()} />
                                  </span>
                                </label>
                              </div>
                              <p className="mt-2 text-xs text-muted-foreground">
                                {4 - sampleFeedPhotosCount} remaining
                              </p>
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
            <Button className="w-[160px]" type="submit" disabled={!form.watch("coverPhoto")}>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

