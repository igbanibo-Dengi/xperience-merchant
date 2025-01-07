"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { experienceMomentsSchema } from "@/lib/schema"
import { Plus, Trash2 } from "lucide-react"

interface ExperienceMomentsStepProps {
  defaultValues?: any
  onSubmit: (data: any) => void
  onBack: () => void
}

export function ExperienceMomentsStep({ defaultValues, onSubmit, onBack }: ExperienceMomentsStepProps) {
  const form = useForm({
    resolver: zodResolver(experienceMomentsSchema),
    defaultValues: defaultValues || {
      enabled: false,
      moments: [{ startTime: "", endTime: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "moments",
  })

  const handleSubmit = (data: any) => {
    onSubmit({ experienceMoments: data });
  }

  return (
    <div className="max-w-2xl xl:max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold">Create Xperience Moments</h2>
            <p className="mt-2">
              Xperience Moments highlight the best photos on the big screen. Let your attendees
              participate in specific time frames for a chance to be featured!
            </p>
          </div>

          <FormField
            control={form.control}
            name="enabled"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex gap-4">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="text-lg text-muted-foreground">Enable Xperience Moments?</FormLabel>
                    <p className="text-muted-foreground text-sm">You can change this later</p>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          {form.watch("enabled") && (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-4 relative">
                  <FormField
                    control={form.control}
                    name={`moments.${index}.startTime`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                          // className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`moments.${index}.endTime`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                          // className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* {index === 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      // onClick={() => remove(index)}
                      className="h-12 border-white hover:bg-white cursor-default text-foreground "
                    >
                      <Trash2 fill="white" stroke="white" />
                    </Button>
                  )} */}

                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => remove(index)}
                      className="size-8 absolute right-1 sm:right-2 top-[36px] border-none  rounded-full bg-transparent hover:scale-125 transition-all duration-300"
                    >
                      <Trash2 className="text-foreground" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size={"lg"}
                className="h-12 font-bold border-foreground text-foreground w-full"
                onClick={() => append({ startTime: "", endTime: "" })}
              >
                <Plus />  Add Another Xperience Moment
              </Button>
            </div>
          )}

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

