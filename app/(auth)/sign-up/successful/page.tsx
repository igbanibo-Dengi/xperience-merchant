// app/verify-email/page.tsx

import React from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md text-center shadow-none border-none bg-transparent">
        <CardContent className="py-10 px-6">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Account Created Successfully</h2>
          <p className="text-gray-600 mb-6">
            Please check your email and click the verification link to activate your account.
          </p>
          <Link href="/sign-in">
            <Button className="w-full">Go to Sign In</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage
