import {
  Home,
  CalendarDays,
  BarChart2,
  Settings,
  HelpCircle,
  Banknote,
} from 'lucide-react'

export const eventbaseUrl = "https://xperience-web-app.vercel.app/event/"

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