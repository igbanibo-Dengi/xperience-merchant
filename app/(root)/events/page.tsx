import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import AllEvents from '@/components/AllEvents'
import CurrentEvents from '@/components/CurrentEvents'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'

const page = () => {
  return (
    <div className='pb-20'>
      <h3 className="text-[32px] font-bold">My Events</h3>
      <Tabs defaultValue="all" className="mt-8 w-full p-0">
        <TabsList className="m-0 rounded-none bg-background p-0">
          <TabsTrigger
            value="all"
            className="m-0 rounded-none border-b-4 border-b-background text-lg text-muted-foreground data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="current"
            className="m-0 rounded-none border-b-4 border-b-background text-lg text-muted-foreground data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Current
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="m-0 rounded-none border-b-4 border-b-background text-lg text-muted-foreground data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="m-0 rounded-none border-b-4 border-b-background text-lg text-muted-foreground data-[state=active]:border-b-4 data-[state=active]:border-black data-[state=active]:font-semibold"
          >
            Past
          </TabsTrigger>
        </TabsList>
        <Separator className="h-0.5 translate-y-[-0.5px] bg-black opacity-25" />

        <TabsContent value="all">
          <AllEvents />
        </TabsContent>
        <TabsContent value="current">
          <CurrentEvents />
        </TabsContent>
        <TabsContent value="upcoming">
          <UpcomingEvents />
        </TabsContent>
        <TabsContent value="past">
          <PastEvents />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
