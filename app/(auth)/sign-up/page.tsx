"use client"

import { useState } from "react"
import { PersonalDetailsForm } from "@/components/personal-details-form"
import { CompanyDetailsForm } from "@/components/company-details-form"
import { SignupSuccess } from "@/components/signup-success"
import type { PersonalDetails, CompanyDetails } from "@/lib/schema"
import { signUpAction } from "@/actions/auth.actions"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
    const [step, setStep] = useState(1)
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const { toast } = useToast()

    const userType = "organizer"

    const handlePersonalDetailsSubmit = (data: PersonalDetails) => {
        setPersonalDetails(data)
        setStep(2)
    }

    const handleCompanyDetailsSubmit = async (data: CompanyDetails) => {
        try {
            if (!personalDetails) {
                throw new Error("Personal details are missing. Please go back and fill the form.")
            }

            const formData = {
                ...personalDetails,
                ...data,
                userType,
            }

            const result = await signUpAction(formData)

            if (result.success) {
                // setIsSuccess(true)
                toast({
                    title: "Success",
                    description: "Your account has been created successfully.",
                    variant: "default",
                })
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An unexpected error occurred.",
                    variant: "destructive",
                })
            }
        } catch (error: any) {
            console.error("Error submitting form:", error)
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred.",
                variant: "destructive",
            })
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-1 items-center h-full w-full justify-center p-6 xl:p-12">
                <SignupSuccess />
            </div>
        )
    }

    return (
        <div>
            {step === 1 ? (
                <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
            ) : (
                <CompanyDetailsForm onSubmit={handleCompanyDetailsSubmit} onBack={() => setStep(1)} />
            )}
        </div>
    )
}

