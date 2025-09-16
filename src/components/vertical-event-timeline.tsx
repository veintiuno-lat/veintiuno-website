"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { events } from "../data/events";

export default function VerticalEventTimeline() {
  return (
    <div className="mx-auto px-4 py-12 max-w-4xl">
      <div className="relative">
        {/* Central Timeline Line - Extended to reach the bottom */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-300 z-0" style={{ height: 'calc(100% + 12rem)' }}></div>

        {events.map((monthData, monthIndex) => (
          <div key={monthIndex} className="relative mb-16">
            {/* Month Card - Black background, centered on timeline */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="bg-custom-black text-custom-gray-light px-6 py-3 rounded-lg font-semibold text-lg shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: monthIndex * 0.1 }}
              >
                {monthData.month}, {monthData.year}
              </motion.div>
            </div>

            {/* Month Node - Orange circle on timeline */}
            {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full z-10"></div> */}

            {/* Events for this month */}
            <div className="space-y-4 md:space-y-6">
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
                        {/* Event Node - Small circle on timeline */}
                        <div className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 md:w-5 md:h-5 rounded-full z-10 ${
                          event.isChecked ? "bg-bitcoin" : "bg-gray-400"
                        } ${
                          eventIndex % 2 === 0
                            ? "right-[-27.3%] md:right-[-10.5%]"
                            : "left-[-27.3%] md:left-[-10.5%]"
                        }`}></div>
                      
                      {/* Event Card */}
                      <div className={`bg-gray-100 p-3 md:p-4 rounded-lg shadow-md ${
                        eventIndex % 2 === 0 ? "mr-4" : "ml-4"
                      }`}>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-800 font-medium text-sm md:text-base">{event.title}</p>
                          {event.isChecked && (
                            <Check className="w-4 h-4 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
                          )}
                        </div>
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

