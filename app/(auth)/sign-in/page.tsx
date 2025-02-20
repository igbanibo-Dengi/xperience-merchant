'use client'

import { useState } from 'react'
import { SignInForm } from '@/components/sign-in-form'
import { SignInSuccess } from '@/components/sign-in-success'
import type { SignInData } from '@/lib/schema'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle, XCircle } from 'lucide-react'
import { ToastAction } from '@/components/ui/toast'
import { logInAction } from '@/lib/actions/auth/logIn.action'

export default function SignInPage() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSignIn = async (data: SignInData) => {
    try {
      setIsLoading(true)
      const result = await logInAction(data)

      if (result.success) {
        setIsSuccess(true)
        setIsLoading(false)
        toast({
          title: 'Welcome Back',
          description: 'sign In successfull',
          variant: 'default',
          action: (
            <ToastAction
              disabled
              altText="error"
              className="h-[60px] w-[60px] border-none disabled:opacity-100"
            >
              <CheckCircle className="h-20 w-20 text-green-500" />
            </ToastAction>
          ),
        })
      } else {
        setIsLoading(false)
        toast({
          title: 'Error',
          description: result.error || 'An unexpected error occurred.',
          variant: 'default',
          action: (
            <ToastAction
              disabled
              altText="error"
              className="h-[60px] w-[60px] border-none disabled:opacity-100"
            >
              <XCircle className="h-20 w-20 text-red-500" />
            </ToastAction>
          ),
        })
      }
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'default',
        action: (
          <ToastAction
            disabled
            altText="error"
            className="h-[60px] w-[60px] border-none disabled:opacity-100"
          >
            <XCircle className="h-20 w-20 text-red-500" />
          </ToastAction>
        ),
      })
    }
  }

  if (isSuccess) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center p-6 xl:p-12">
        <SignInSuccess />
      </div>
    )
  }

  return (
    <div className="mx-auto flex items-center justify-center">
      <SignInForm isLoading={isLoading} onSubmit={handleSignIn} />
    </div>
  )
}
