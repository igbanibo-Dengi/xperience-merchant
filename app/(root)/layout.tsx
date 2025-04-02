import Header from '@/components/Header'
import { AppSidebar } from '@/components/ui/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex-1 overflow-y-scroll px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
