import Header from '@/components/Header'
import { AppSidebar } from '@/components/ui/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const token = (cookies()).get('auth_token')?.value

  if (!token) redirect('sign-in')

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full flex-col">
        <Header />
        <div className="flex-1 overflow-y-scroll px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
