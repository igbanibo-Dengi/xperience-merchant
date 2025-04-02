'use client'

import Image from 'next/image'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavUser } from '../nav-user'
import { sidebarLinks } from '@/constants'



const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/images/SWIFT.jpg',
  },
}

export function AppSidebar() {
  const pathname = usePathname()
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()


  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-black pb-4">
        <div className="flex items-center justify-between px-4 py-4">
          <span className='uppercase text-white flex'>

            <Image
              src='/icons/x.svg'
              width={20}
              height={20}
              alt="Logo"
            />
            {open && (
              <p className='mt-auto font-semibold text-lg'>
                perience
              </p>
            )}
          </span>

        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarLinks.map((item) => {
                const isActive =
                  pathname === item.url || pathname.startsWith(`${item.url}/`)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-[41px] text-base text-white hover:bg-muted data-[active=true]:bg-primary data-[active=true]:text-white"
                    >
                      <Link href={item.url}>
                        <item.icon
                          size={16}
                          className={`mr-3 text-muted-foreground ${isActive ? 'text-white' : ''}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile Section */}
        <SidebarFooter className="mt-auto">
          <NavUser user={data.user} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
