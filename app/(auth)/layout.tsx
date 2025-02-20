import { ImageGrid } from '@/components/image-grid'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="grid h-screen overflow-hidden xl:grid-cols-2">
      <div className="hidden xl:block">
        <ImageGrid />
      </div>
      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
