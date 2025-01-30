"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react" // Added import for React

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()

  useEffect(() => {
    // Check for auth token in client-side
    const token = document.cookie.includes("auth_token")
    if (!token) {
      router.push("/sign-in")
    }
  }, [router])

  return <>{children}</>
}

