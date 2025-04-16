import Header from '@/components/Header'
import { AppSidebar } from '@/components/ui/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getLoggedInUser } from '@/lib/actions/user/user.action'
import { LoggedInUser } from '@/types/auth'
import { cookies } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const User = await getLoggedInUser()
  const LoggedInUser = User.data as LoggedInUser

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar loggedInUser={LoggedInUser} />
      <main className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex-1 overflow-y-scroll px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
