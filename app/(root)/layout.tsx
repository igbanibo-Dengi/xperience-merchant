import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-muted/50 w-full p-4" >
                {children}
            </main>
        </SidebarProvider>
    );
}