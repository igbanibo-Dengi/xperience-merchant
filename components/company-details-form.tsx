'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type CompanyDetails, companyDetailsSchema } from '@/lib/schema'
import { CompanyDetailsFormProps } from '@/types/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { Building2, MapPin, Globe } from 'lucide-react'
import { Checkbox } from './ui/checkbox'

export function CompanyDetailsForm({
  onSubmit,
  onBack,
  isLoading,
}: CompanyDetailsFormProps) {
  const form = useForm<CompanyDetails>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      termsAccepted: false,
    },
  })

  return (
    <div className="flex min-h-screen flex-col justify-center p-8">
      <div className="mx-auto w-full max-w-lg space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign up</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <h2 className="text-lg font-semibold">Company Details</h2>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Company Name"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="pl-10">
                          <Globe className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                          <SelectValue placeholder="Select industry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Separator /> */}
              <div className="space-y-2 pt-4">
                <h2 className="text-lg font-semibold">Company Address</h2>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-4 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter Address"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Province" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP / Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the{" "}
                      <Link href="#" className="text-primary underline">
                        Terms & Conditions
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                {isLoading ? 'Signing You Up...' : 'Sign Up'}
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="font-semibold text-foreground hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
