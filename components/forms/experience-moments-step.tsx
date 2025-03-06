"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { experienceMomentsSchema } from "@/lib/schema"
import type { ExperienceMomentsStepProps } from "@/types/event"
import { Asterisk } from "lucide-react"

export function ExperienceMomentsStep({ defaultValues, onSubmit, onBack }: ExperienceMomentsStepProps) {
  const form = useForm({
    resolver: zodResolver(experienceMomentsSchema),
    defaultValues: defaultValues ?? {
      active: false,
      recurrence: "",
      duration: "",
    },
    mode: "onChange", // This enables validation as fields change
  })

  const handleSubmit = (data: any) => {
    onSubmit({ experienceMoments: data })
  }

  const isActive = form.watch("active")

  return (
    <div className="mx-auto max-w-2xl xl:max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold md:text-[32px]">Create Experience Moments</h2>
            <p className="mt-2">
              Experience Moments highlight the best photos on the big screen. Let your attendees participate in specific
              time frames for a chance to be featured!
            </p>
          </div>

          {/* Enable Experience Moments Toggle */}
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-4 items-center">
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="text-lg text-muted-foreground">Enable Experience Moments?</FormLabel>
                    <p className="text-sm text-muted-foreground">You can change this later</p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Show additional fields only if enabled */}
          {isActive && (
            <div className="space-y-4">
              {/* Recurrence Field */}
              <FormField
                control={form.control}
                name="recurrence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Recurrence (in days) <Asterisk className="inline text-destructive" size={10} />
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter recurrence in days" {...field} required={isActive} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration Field */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Duration (in minutes) <Asterisk className="inline text-destructive" size={10} />
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter duration in minutes" {...field} required={isActive} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button className="w-[160px]" type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button className="w-[160px]" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

