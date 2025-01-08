import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import EventOverview from '@/components/event-components/EventOverview';
import EventPhotos from '@/components/event-components/EventPhotos';
import EventXperienceMoments from '@/components/event-components/EventXperienceMoments';

const page = () => {
    return (
        <div className=''>
            <h3 className='text-2xl md:text-[32px] font-bold'>Taylor Swift: Eras Tour</h3>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                <span className=''>
                    <span className='flex flex-col lg:flex-row lg:items-center gap-2'>
                        <p className='font-semibold text-lg'>November 1, 2024 at 7:00PM</p>
                        <p className='flex items-center gap-2 text-primary font-semibold'>
                            <span className='text-4xl md:text-6xl text-primary'>•</span>
                            EVENT IS LIVE NOW
                        </p>
                    </span>
                    <p className='text-lg font-medium'>Scotiabank Arena</p>
                </span>
                <Button size={"lg"} variant={'outline'} className='flex mt-4 lg:mt-0 items-center gap-2 border-foreground text-foreground'>
                    <p>Next Xperience moment: <span>00:09:37</span></p>
                </Button>
            </div>

            {/* TABS */}
            <Tabs defaultValue="overview" className="w-full p-0 mt-8">
                <TabsList className="bg-background rounded-none p-0 m-0">
                    <div className='grid grid-cols-3 md:grid-cols-6 border-foreground border-2 md:border-x-0 md:border-t-0 mb-16 rounded-md md:rounded-none p-2 md:px-0 pb-0'>

                        <TabsTrigger
                            value="overview"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="photos"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
                        >
                            Photos
                        </TabsTrigger>
                        <TabsTrigger
                            value="xperience-moments"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
                        >
                            <span className='hidden lg:block'> Xperience </span>Moments
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
                        >
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="qr-code"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
                        >
                            QR Code
                        </TabsTrigger>
                        <TabsTrigger
                            value="event-settings"
                            className='m-0 text-muted-foreground rounded-none border-b-4 border-b-background data-[state=active]:border-black data-[state=active]:font-semibold lg:data-[state=active]:border-b-2'
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
                    <p className='text-muted-foreground'>Analytics data will be displayed here.</p>
                </TabsContent>
                <TabsContent value="qr-code">
                    {/*V0.DEV INSERT COMING SOON UI HERE */}
                </TabsContent>
                <TabsContent value="event-settings">
                    {/*V0.DEV INSERT COMING SOON UI HERE */}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default page;
