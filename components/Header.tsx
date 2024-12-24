'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'

const Header = () => {
    const pathname = usePathname()

    return (
        <div className='bg-muted/50 flex items-center w-full border-b-2 border-foreground h-[48px] pl-4'>
            <div className='flex items-center justify-between w-full'>
                <p>
                    Home
                </p>

                <SidebarTrigger className='text-foreground lg:hidden' />
            </div>
        </div>
    )
}

export default Header