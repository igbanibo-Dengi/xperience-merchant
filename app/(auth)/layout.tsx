import { ImageGrid } from "@/components/image-grid"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid xl:grid-cols-2 h-screen overflow-hidden">
      <div className="hidden xl:block">
        <ImageGrid />
      </div>
      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}

