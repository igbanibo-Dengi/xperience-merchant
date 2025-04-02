import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import AllEvents from '@/components/AllEvents'
import CurrentEvents from '@/components/CurrentEvents'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'
import type { EventsData } from '@/types/event'
import { getUserEvents } from '@/lib/actions/events/getUserEvents'

const EventsPage = async () => {
  let eventsData: EventsData = []

  try {
    const response = await getUserEvents()
    // Access the events array from response.data

    eventsData = Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Failed to fetch events:', error)
    // Continue with empty array
  }

  return (
    <div className="pb-20">
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
          <AllEvents events={eventsData} />
        </TabsContent>
        <TabsContent value="current">
          <CurrentEvents events={eventsData} />
        </TabsContent>
        <TabsContent value="upcoming">
          <UpcomingEvents events={eventsData} />
        </TabsContent>
        <TabsContent value="past">
          <PastEvents events={eventsData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EventsPage
