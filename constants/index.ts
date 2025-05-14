import {
  Home,
  CalendarDays,
  BarChart2,
  Settings,
  HelpCircle,
  Banknote,
} from 'lucide-react'

export const basicPlanId = "67f790ca161d52e6deaf2545"

// export const eventbaseUrl = "https://xperience-web-app.vercel.app/event/"
export const eventbaseUrl = "https://xperience.cam/event/"

export const sidebarLinks = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Events',
    url: '/events',
    icon: CalendarDays,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart2,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Pricing',
    url: '/pricing',
    icon: Banknote,
  },
  {
    title: 'Support',
    url: '/support',
    icon: HelpCircle,
  },
]