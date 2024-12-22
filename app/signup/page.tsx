"use client"

import { useState } from "react"
import { PersonalDetailsForm } from "@/components/personal-details-form"
import { CompanyDetailsForm } from "@/components/company-details-form"
import { SignupSuccess } from "@/components/signup-success"
import type { PersonalDetails, CompanyDetails } from "@/lib/schema"

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePersonalDetailsSubmit = (data: PersonalDetails) => {
    setPersonalDetails(data)
    setStep(2)
  }

  const handleCompanyDetailsSubmit = async (data: CompanyDetails) => {
    // Simulate API call
    try {
      // Combine both forms data
      const formData = {
        ...personalDetails,
        ...data,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // If successful, show success state
      setIsSuccess(true)

      // Log the form data
      console.log('Form submitted:', formData)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  if (isSuccess) {
    return (
      <div className="container max-w-lg mx-auto p-6">
        <div className="rounded-lg border bg-card p-8">
          <SignupSuccess />
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-lg mx-auto p-6">
      <div className="rounded-lg border bg-card p-8">
        {step === 1 ? (
          <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
        ) : (
          <CompanyDetailsForm
            onSubmit={handleCompanyDetailsSubmit}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  )
}

