'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logOutAction } from '@/lib/actions/auth/logout.action'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logOutAction()
    router.refresh() // Refresh the current route
  }

  return (
    <span onClick={handleLogout} className="w-full">
      Log out
    </span>
  )
}
