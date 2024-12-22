"use client"

import { useState } from "react"
import { PersonalDetailsForm } from "@/components/personal-details-form"
import { CompanyDetailsForm } from "@/components/company-details-form"
import { SignupSuccess } from "@/components/signup-success"
import type { PersonalDetails, CompanyDetails } from "@/lib/schema"
import Image from "next/image";

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
            <div className="flex flex-col xl:flex-row h-screen">
                <div className="hidden xl:flex xl:w-1/2 bg-black p-4">
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <div
                            className="col-span-3 bg-[url('/images/auth-1.svg')] h-52 bg-cover bg-center bg-no-repeat rounded-lg"
                        />
                        <div
                            className="bg-[url('/images/auth-2.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg"
                        />
                        <div
                            className="bg-[url('/images/auth-3.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg"
                        />
                        <div className="rounded-lg overflow-hidden">
                            <Image
                                src="/images/auth-4.jpg"
                                alt="Auth Image"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center p-6 xl:p-12">
                    <SignupSuccess />
                </div>
            </div>
        )
    }

    return (
        <div className="flex">
            <div className="hidden xl:flex xl:w-1/2 bg-black p-4">
                <div className="grid grid-cols-3 gap-4 w-full">
                    <div
                        className="col-span-3 bg-[url('/images/auth-1.svg')] h-52 bg-cover bg-center bg-no-repeat rounded-lg"
                    />
                    <div
                        className="bg-[url('/images/auth-2.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg"
                    />
                    <div
                        className="bg-[url('/images/auth-3.jpg')] h-full bg-cover bg-center bg-no-repeat rounded-lg"
                    />
                    <div className="rounded-lg overflow-hidden">
                        <Image
                            src="/images/auth-4.jpg"
                            alt="Auth Image"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-6 p-4">
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

