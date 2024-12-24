import Header from "@/components/Header";
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
            <main className=" w-full" >
                <Header />
                <div className="p-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}