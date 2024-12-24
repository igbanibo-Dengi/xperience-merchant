'use client'

import { Button } from '@/components/ui/button';
import { CircleAlert, X } from 'lucide-react';
import React, { useState } from 'react';

const Page = () => {
    const [showAlert, setShowAlert] = useState(true);

    const event = 0

    return (
        <div className="p-6">
            {/* Header */}
            <h3 className="text-[32px] font-bold mb-4">Hey there, John</h3>



            {/* Content Section */}
            <div className="flex justify-between">
                {/* Left Section */}
                <div className="flex-1">
                    {/* Alert Section */}
                    {showAlert && event < 1 && (
                        <div className="bg-blue-100 relative border border-blue-300 text-[#213959] p-8 rounded-md flex gap-4 justify-between items-center mb-6">
                            <CircleAlert fill='#213959' stroke='white' size={60} className='rotate-180' />
                            <div>
                                <h4 className="font-semibold mb-4">Welcome to your dashboard!</h4>
                                <p className="text-sm">
                                    Here, you can create and manage events, track engagement, and explore insights. Check out the support tab
                                    for further guidance!
                                </p>
                            </div>
                            <button
                                className="text-blue-800 font-bold text-xl hover:text-blue-900 absolute top-2 right-2"
                                onClick={() => setShowAlert(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                    )}

                    {/* Upcoming Events */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Upcoming Events</h4>
                        <div className="border-2 rounded-md p-8 text-center">
                            <p className="mb-4">You have no upcoming events.</p>
                            <Button size={"lg"}>
                                + Create Event
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                {showAlert && event < 1 && (
                    <div className="w-[300px] h-fit border-2 rounded-md p-4 ml-6">
                        <h4 className="font-semibold mb-2">Take your events to the next level!</h4>
                        <p className="text-sm text-gray-500 mb-4">
                            Upgrade to Enterprise now to try:
                        </p>
                        <ul className="text-sm text-gray-700 mb-6 list-disc list-inside">
                            <li>Unlimited number of events</li>
                            <li>Full suite of advanced analytics and reporting</li>
                        </ul>
                        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full">
                            Upgrade Plan
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
export default Page;
