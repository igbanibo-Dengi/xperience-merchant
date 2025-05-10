import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export function EventSuccess() {
  return (
    <div className="flex h-full min-h-[70vh] w-full flex-col items-center justify-center text-center">
      <div className="mb-6 rounded-full bg-primary/10 p-4">
        <CheckCircle className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-3xl font-bold md:text-[48px]">
        You&apos;re all set!
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Your event is officially live and ready to go. Invite your audience,{' '}
        <br className="hidden md:block" /> track engagement, and make any
        changes as needed. <br className="hidden md:block" /> It&apos;s
        showtime! 🎉
      </p>
      <div className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-y-4">
        <Button variant="outline" className="w-full" size="lg">
          <Link
            href="/events"
            className="flex w-full items-center justify-center"
          >
            Go to Events
          </Link>
        </Button>
      </div>
    </div>
  )
}
