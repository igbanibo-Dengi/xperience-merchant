'use client'


import React from 'react';
import { Clock, BarChart2, Rocket } from 'lucide-react';

const EventAnalytics = () => {
  return (
    <div className="flex items-center justify-cente p-4">
      <div className="w-full  overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/20 rounded-full">
            <BarChart2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Analytics</h1>
        <p className="text-gray-600 mb-6">Powerful insights coming your way soon</p>

        <div className="flex items-center justify-center gap-2 mb-8 text-primary">
          <Clock className="w-5 h-5" />
          <span className="text-sm font-medium">In development</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full animate-progress"
            style={{ width: '65%' }}
          ></div>
        </div>

        <div className="bg-primary/20 rounded-lg p-4 flex items-start gap-3">
          <Rocket className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground text-left">
            We're building a comprehensive analytics dashboard to help you track and optimize your events.
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;