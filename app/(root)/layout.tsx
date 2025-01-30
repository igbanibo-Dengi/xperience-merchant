import Header from "@/components/Header";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <AppSidebar />
                <main className=" w-full" >
                    <Header />
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedRoute>
    );
}