'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export function SignupSuccess() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/sign-in')
    }, 1000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <CheckCircle className="h-16 w-16 text-primary" />
      <h2 className="text-2xl font-semibold">Account Created!</h2>
      <p className="text-muted-foreground">
        You&apos;re being redirected to the sign in page.
      </p>
      {/* <Button variant={'link'} className="font-bold" asChild>
        <Link href="/" className="font-bold text-primary transition-colors">
          Go to the dashboard
        </Link>
      </Button> */}
    </div>
  )
}
