'use client'

import { useState } from 'react'
import { PersonalDetailsForm } from '@/components/personal-details-form'
import { CompanyDetailsForm } from '@/components/company-details-form'
import type { PersonalDetails, CompanyDetails } from '@/lib/schema'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signUpAction } from '@/lib/actions/auth/signUp.action'

export default function SignUpPage() {
  const [step, setStep] = useState(1)
  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetails | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const router = useRouter()

  const userType = 'organizer'

  const handlePersonalDetailsSubmit = (data: PersonalDetails) => {
    setPersonalDetails(data)
    setStep(2)
  }

  const handleCompanyDetailsSubmit = async (data: CompanyDetails) => {
    try {
      setIsLoading(true)
      if (!personalDetails) {
        throw new Error(
          'Personal details are missing. Please go back and fill the form.'
        )
      }

      const formData = {
        ...personalDetails,
        ...data,
        userType,
      }

      const result = await signUpAction(formData)

      if (result.success) {
        setIsSuccess(true)
        setIsLoading(false)
        toast({
          title: 'Success',
          description: 'Your account has been created successfully.',
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
        router.push('/sign-in')
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

  // if (isSuccess) {
  //     return (
  //         <div className="flex flex-1 items-center h-full w-full justify-center p-6 xl:p-12">
  //             <SignupSuccess />
  //         </div>
  //     )
  // }

  return (
    <div>
      {step === 1 ? (
        <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
      ) : (
        <CompanyDetailsForm
          isLoading={isLoading}
          onSubmit={handleCompanyDetailsSubmit}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  )
}
