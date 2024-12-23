"use client"

import { Home, CalendarDays, BarChart2, Settings, HelpCircle, Banknote } from 'lucide-react'
import Image from "next/image"
import {
    Sidebar,
    SidebarContent,
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

const items = [
    {
        title: "Home",
        url: "/",
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
                    <span className={`flex items-center overflow-hidden transition-all ease-in-out duration-300 ${open ? "w-full" : 'w-0'}`}>
                        <Image
                            src="/icons/x.svg"
                            width={14}
                            height={16}
                            alt="Xperience Logo"
                            className="mr-0.5"
                        />
                        <p className="text-2xl font-bold text-white">perience</p>
                    </span>
                    <SidebarTrigger className='hover:bg-transparent' />
                </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="text-white data-[active=true]:bg-primary data-[active=true]:text-white hover:bg-muted h-[41px] text-base"
                                    >
                                        <a href={item.url}>
                                            <item.icon size={16} className={`text-muted-foreground mr-3 data-[active=true]:text-white ${pathname === item.url ? "text-white" : ""}`} />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Profile Section */}
                <div className="mt-auto">
                    <SidebarMenuButton
                        className="w-full text-white hover:bg-white/10"
                    >
                        <Avatar className="h-6 w-6">
                            <AvatarImage src="/avatars/user.png" alt="Profile" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        {
                            open ?
                                <span>Profile</span>
                                :
                                ""
                        }
                    </SidebarMenuButton>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

