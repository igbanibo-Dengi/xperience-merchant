"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type PersonalDetails, personalDetailsSchema } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormStatus } from "react-dom"
import { User, Phone, Mail, Lock, Apple, Chrome } from "lucide-react"
import Link from "next/link"

interface PersonalDetailsFormProps {
  onSubmit: (data: PersonalDetails) => void
}

export function PersonalDetailsForm({ onSubmit }: PersonalDetailsFormProps) {
  const form = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col justify-center min-h-screen p-8">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="John Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="+123 XXX XXXX" type="tel" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="example@domain.com" type="email" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter a strong Pssword" type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Confirm Your Password" type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Continue"}
            </Button>
            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="w-full" type="button">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Chrome className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div> */}

            <p className="text-center text-muted-foreground text-sm">Already have an account? <Link href='/sign-in' className="text-foreground font-semibold hover:underline">Sign In</Link></p>
          </form>
        </Form>
      </div>
    </div>
  )
}

