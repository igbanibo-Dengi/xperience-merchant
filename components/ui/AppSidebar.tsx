"use client"

import { Home, CalendarDays, BarChart2, Settings, HelpCircle, Banknote } from 'lucide-react'
import Image from "next/image"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
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
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from './button'
import { NavUser } from '../nav-user'

const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Events",
        url: "/events",
        icon: CalendarDays,
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart2,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
    {
        title: "Pricing",
        url: "/pricing",
        icon: Banknote,
    },
    {
        title: "Support",
        url: "/support",
        icon: HelpCircle,
    },
]

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
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
                    <span className={`flex items-center overflow-hidden transition-all ease-in-out duration-300 ${open ? "w-full" : ''}`}>
                        <Image
                            src="/icons/x.svg"
                            width={14}
                            height={16}
                            alt="Xperience Logo"
                            className="mr-0.5"
                        />
                        <p className="text-2xl font-bold text-white">perience</p>
                    </span>
                    <SidebarTrigger className='hover:text-white hover:bg-transparent text-white' />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className="text-white data-[active=true]:bg-primary data-[active=true]:text-white hover:bg-muted h-[41px] text-base"
                                        >
                                            <Link href={item.url}>
                                                <item.icon
                                                    size={16}
                                                    className={`text-muted-foreground mr-3 ${isActive ? "text-white" : ""}`}
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
                <SidebarFooter className='mt-auto'>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}

