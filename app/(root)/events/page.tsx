import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator'
import AllEvents from '@/components/AllEvents'
import CurrentEvents from '@/components/CurrentEvents'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'


const page = () => {
    return (
        <div>
            <h3 className='text-[32px] font-bold'>My Events</h3>
            <Tabs defaultValue="all" className="w-full p-0 mt-8">
                <TabsList className="bg-background rounded-none p-0 m-0 ">
                    <TabsTrigger
                        value="all"
                        className='m-0  text-muted-foreground text-lg rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold  data-[state=active]:border-b-4'
                    >
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="current"
                        className='m-0  text-muted-foreground text-lg rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold  data-[state=active]:border-b-4'
                    >
                        Current
                    </TabsTrigger>
                    <TabsTrigger
                        value="upcoming"
                        className='m-0  text-muted-foreground text-lg rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold  data-[state=active]:border-b-4'
                    >
                        Upcoming
                    </TabsTrigger>
                    <TabsTrigger
                        value="past"
                        className='m-0  text-muted-foreground text-lg rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold  data-[state=active]:border-b-4'
                    >
                        Past
                    </TabsTrigger>

                </TabsList>
                <Separator className='translate-y-[-0.5px] h-0.5 bg-black opacity-25' />

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