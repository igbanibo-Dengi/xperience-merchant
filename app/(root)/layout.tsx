import Header from '@/components/Header'
import { AppSidebar } from '@/components/ui/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
