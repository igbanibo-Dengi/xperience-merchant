import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import EventOverview from '@/components/event-components/EventOverview'
import EventPhotos from '@/components/event-components/EventPhotos'
import EventXperienceMoments from '@/components/event-components/EventXperienceMoments'

const page = () => {
  return (
    <div className="">
      <h3 className="text-2xl font-bold md:text-[32px]">
        Taylor Swift: Eras Tour
      </h3>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <span className="">
          <span className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <p className="text-lg font-semibold">November 1, 2024 at 7:00PM</p>
            <p className="flex items-center gap-2 font-semibold text-primary">
              <span className="text-4xl text-primary md:text-6xl">•</span>
              EVENT IS LIVE NOW
            </p>
          </span>
          <p className="text-lg font-medium">Scotiabank Arena</p>
        </span>
        <Button
          size={'lg'}
          variant={'outline'}
          className="mt-4 flex items-center gap-2 border-foreground text-foreground lg:mt-0"
        >
          <p>
            Next Xperience moment: <span>00:09:37</span>
          </p>
        </Button>
      </div>

      {/* TABS */}
      <Tabs defaultValue="overview" className="mt-8 w-full p-0">
        <TabsList className="m-0 rounded-none bg-background p-0">
          <div className="mb-16 grid grid-cols-3 rounded-md border-2 border-foreground p-2 pb-0 md:grid-cols-6 md:rounded-none md:border-x-0 md:border-t-0 md:px-0">
            <TabsTrigger
              value="overview"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="xperience-moments"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              <span className="hidden lg:block"> Xperience </span>Moments
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="qr-code"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              QR Code
            </TabsTrigger>
            <TabsTrigger
              value="event-settings"
              className="m-0 rounded-none border-b-4 border-b-background text-muted-foreground data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2"
            >
              Event Settings
            </TabsTrigger>
          </div>
        </TabsList>
        {/* <Separator className='hidden lg:block translate-y-[-4px] h-0.5 bg-black opacity-25' /> */}

        <TabsContent value="overview">
          <EventOverview />
        </TabsContent>
        <TabsContent value="photos">
          <EventPhotos />
        </TabsContent>
        <TabsContent value="xperience-moments">
          <EventXperienceMoments />
        </TabsContent>
        <TabsContent value="analytics">
          <p className="text-muted-foreground">
            Analytics data will be displayed here.
          </p>
        </TabsContent>
        <TabsContent value="qr-code">
          {/*V0.DEV INSERT COMING SOON UI HERE */}
        </TabsContent>
        <TabsContent value="event-settings">
          {/*V0.DEV INSERT COMING SOON UI HERE */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page
