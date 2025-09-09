"use client";

import { motion } from "framer-motion";
import { events } from "../data/events";

export default function VerticalEventTimeline() {
  return (
    <div className="mx-auto px-4 py-12 max-w-4xl">
      <div className="relative">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300 z-0"></div>

        {events.map((monthData, monthIndex) => (
          <div key={monthIndex} className="relative mb-16">
            {/* Month Card - Black background, centered on timeline */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: monthIndex * 0.1 }}
              >
                {monthData.month}, {monthData.year}
              </motion.div>
            </div>

            {/* Month Node - Orange circle on timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"></div>

            {/* Events for this month */}
            <div className="space-y-6">
              {monthData.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  className={`flex items-center ${
                    eventIndex % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, x: eventIndex % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: monthIndex * 0.1 + eventIndex * 0.1 }}
                >
                  <div className={`w-1/2 ${eventIndex % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="relative">
                      {/* Event Node - Light gray circle */}
                      <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full z-10 ${
                        eventIndex % 2 === 0 ? "right-0" : "left-0"
                      }`}></div>
                      
                      {/* Event Card */}
                      <div className={`bg-gray-200 p-4 rounded-lg shadow-md ${
                        eventIndex % 2 === 0 ? "mr-4" : "ml-4"
                      }`}>
                        <p className="text-gray-800 font-medium">{event.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

