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

        <div className="flex items-center mx-auto justify-center ">
            <div className="">
                {isSuccess ? (
                    <SignInSuccess />
                ) : (
                    <SignInForm onSubmit={handleSignIn} />
                )}
            </div>
        </div>
    )
}

