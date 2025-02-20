'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

const Header = () => {
  const pathname = usePathname()

  return (
    <div className="flex h-[48px] w-full items-center border-b-2 border-foreground bg-background pl-4">
      <div className="container flex w-full items-center justify-between pr-4">
        <p>Home</p>

        <SidebarTrigger className="text-foreground lg:hidden" />
      </div>
    </div>
  )
}

export default Header
