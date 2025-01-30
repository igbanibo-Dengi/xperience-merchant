"use client"

import { useState } from "react"
import { SignInForm } from "@/components/sign-in-form"
import { SignInSuccess } from "@/components/sign-in-success"
import type { SignInData } from "@/lib/schema"
import { useToast } from "@/hooks/use-toast"
import { logInAction } from "@/actions/auth.actions"
import { CheckCircle, XCircle } from "lucide-react"
import { ToastAction } from "@/components/ui/toast"

export default function SignInPage() {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()


    const handleSignIn = async (data: SignInData) => {
        try {
            // If successful, show success state
            setIsLoading(true)
            const result = await logInAction(data)

            if (result.success) {
                setIsSuccess(true)
                setIsLoading(false)
                toast({
                    title: "Welcome Back",
                    description: "sign In successfull",
                    variant: "default",
                    action: (
                        <ToastAction
                            disabled
                            altText="error"
                            className="disabled:opacity-100 h-[60px] w-[60px] border-none"
                        >
                            <CheckCircle className="h-20 w-20 text-green-500" />
                        </ToastAction>
                    ),
                })
            } else {
                setIsLoading(false)
                toast({
                    title: "Error",
                    description: result.error || "An unexpected error occurred.",
                    variant: "default",
                    action: (
                        <ToastAction
                            disabled
                            altText="error"
                            className="disabled:opacity-100 h-[60px] w-[60px] border-none"
                        >
                            <XCircle className="h-20 w-20 text-red-500" />
                        </ToastAction>
                    ),
                })
            }
        } catch (error: any) {
            console.error("Error submitting form:", error)
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred.",
                variant: "default",
                action: (
                    <ToastAction
                        disabled
                        altText="error"
                        className="disabled:opacity-100 h-[60px] w-[60px] border-none"
                    >
                        <XCircle className="h-20 w-20 text-red-500" />
                    </ToastAction>
                ),
            })
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-1 items-center h-full w-full justify-center p-6 xl:p-12">
                <SignInSuccess />
            </div>
        )
    }

    return (

        <div className="flex items-center mx-auto justify-center ">
            <SignInForm isLoading={isLoading} onSubmit={handleSignIn} />
        </div>
    )
}

