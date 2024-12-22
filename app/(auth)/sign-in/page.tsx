"use client"

import { useState } from "react"
import { SignInForm } from "@/components/sign-in-form"
import { SignInSuccess } from "@/components/sign-in-success"
import type { SignInData } from "@/lib/schema"
import Image from "next/image"

export default function SignInPage() {
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSignIn = async (data: SignInData) => {
        // Simulate API call
        try {
            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // If successful, show success state
            setIsSuccess(true)

            // Log the form data
            console.log('Sign in data:', data)
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }

    return (
        <div className="flex flex-col xl:flex-row h-screen">
            {/* Sidebar */}
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

            {/* Form Container */}
            <div className="flex items-center mx-auto justify-center ">
                <div className="">
                    {isSuccess ? (
                        <SignInSuccess />
                    ) : (
                        <SignInForm onSubmit={handleSignIn} />
                    )}
                </div>
            </div>
        </div>
    )
}

