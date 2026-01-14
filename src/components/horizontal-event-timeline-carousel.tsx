"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  CircleDashed,
  CircleEllipsis,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { events } from "@/data/events";

const height = "30rem";

export default function HorizontalEventTimelineCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [expandedHeight, setExpandedHeight] = useState<number>(100);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null); // Ref for the header content

  // Calculate expanded height based on total height minus header height
  useEffect(() => {
    if (carouselRef.current && headerRef.current) {
      const totalHeight = carouselRef.current.getBoundingClientRect().height;
      const headerHeight = headerRef.current.getBoundingClientRect().height;
      // Calculate available space for expanded section
      // Subtract header height and some padding (e.g., 20px) from total height
      const availableHeight = totalHeight - headerHeight - 110;
      setExpandedHeight(Math.max(availableHeight, 50)); // Ensure minimum height of 50px
    }
  }, []);

  const toggleExpand = (index: number) => {
    if (index === currentIndex) {
      // If clicking on the current card, toggle its dropdown
      setExpandedIndex(expandedIndex === index ? null : index);
    } else {
      // If clicking on a different card, navigate to it and open its dropdown
      setCurrentIndex(index);
      setExpandedIndex(index);
    }
  };

  const getMonthName = (item: (typeof events)[0]) => {
    return item.month || `${item.periodType}${item.periodNumber}`;
  };

  const isCurrentMonth = (item: (typeof events)[0]) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-11
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthName = monthNames[currentMonth];
    return item.month === currentMonthName;
  };

  const nextSlide = () => {
    const newIndex = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setExpandedIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setExpandedIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setExpandedIndex(index);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    index: number
  ) => {
    const SWIPE_THRESHOLD = 50;
    if (info.offset.x > SWIPE_THRESHOLD && index === currentIndex) {
      prevSlide();
    } else if (info.offset.x < -SWIPE_THRESHOLD && index === currentIndex) {
      nextSlide();
    }
  };

  const cardVariants = {
    active: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      transition: { duration: 0.3 },
    },
    inactive: {
      scale: 0.9,
      opacity: 0.7,
      zIndex: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className='mx-auto px-4 py-12 max-w-7xl'>
      <motion.h1
        className='text-4xl md:text-6xl font-bold mb-8 text-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cruzada 2025
      </motion.h1>

      <motion.p
        className='text-xl md:text-2xl text-custom-gray leading-relaxed mx-auto mb-6 font-heading text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Nuestro lanzamiento
      </motion.p>

      <div className='relative'>
        <button
          onClick={prevSlide}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background p-2 rounded-full shadow-md hover:bg-primary/10 transition-colors'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          onClick={nextSlide}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background p-2 rounded-full shadow-md hover:bg-primary/10 transition-colors'
        >
          <ChevronRight className='w-6 h-6' />
        </button>

        <div className='absolute left-0 right-0 top-1/2 h-0.5 bg-primary/[.06] z-0'></div>

        <div
          ref={carouselRef}
          className='relative overflow-hidden touch-pan-x'
          style={{ height }}
        >
          <div className='flex h-full items-center justify-center'>
            {events.map((item, index) => (
              <motion.div
                key={index}
                className='absolute w-72 mx-4'
                variants={cardVariants}
                initial='inactive'
                animate={index === currentIndex ? "active" : "inactive"}
                style={{
                  x: `${Math.round((index - currentIndex) * 300)}px`,
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
                drag='x'
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.1}
                onDragEnd={(e, info) => handleDragEnd(e, info, index)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 z-10 ${
                    index === currentIndex
                      ? "bg-primary"
                      : "border-2 border-primary bg-transparent"
                  }`}
                  style={{
                    left: "46%",
                    top: "-0.6rem",
                    willChange: "transform",
                    transform: "translateZ(0)",
                  }}
                />

                <motion.div
                  layout
                  className='w-full'
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card className='overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                    <CardContent className='p-0'>
                      <div
                        ref={index === 0 ? headerRef : null} // Measure first card's header
                        className='p-6 flex flex-col items-center text-center cursor-pointer hover:bg-gray-50/50 transition-colors duration-200'
                        onClick={() => toggleExpand(index)}
                      >
                        <h3 className='text-xl font-bold text-primary'>
                          {getMonthName(item)}
                        </h3>
                        <p className='text-lg font-medium'>{item.year}</p>
                        <div className='flex items-center text-sm text-muted-foreground mt-1'>
                          {isCurrentMonth(item) ? (
                            <>
                              <CircleEllipsis className='w-6 h-6 mr-1 text-orange-500' />
                              <span>Ongoing</span>
                            </>
                          ) : item.isChecked ? (
                            <>
                              <CheckCircle className='w-6 h-6 mr-1 text-green-500' />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <CircleDashed className='w-6 h-6 mr-1 text-gray-400' />
                              <span>Planned</span>
                            </>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            rotate: expandedIndex === index ? 180 : 0,
                            opacity: index === currentIndex ? 1 : 0.5,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className='w-5 h-5 text-muted-foreground mt-2' />
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {expandedIndex === index && index === currentIndex && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: expandedHeight, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className='overflow-y-auto'
                          >
                            <div className='px-6 pb-6 pt-2 border-t border-border/50'>
                              <div className='mb-4'>
                                <h4 className='text-sm font-semibold flex items-center justify-center mb-2'>
                                  Events
                                </h4>
                                <ul className='grid grid-cols-1 gap-2'>
                                  {item.events.map((event, i) => (
                                    <motion.li
                                      key={i}
                                      className='flex items-start'
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.3,
                                        delay: i * 0.1,
                                        ease: "easeOut",
                                      }}
                                    >
                                      {isCurrentMonth(item) ? (
                                        <CircleEllipsis className='w-6 h-6 mr-2 text-orange-500 mt-0.5 shrink-0' />
                                      ) : event.isChecked ? (
                                        <CheckCircle className='w-6 h-6 mr-2 text-green-500 mt-0.5 shrink-0' />
                                      ) : (
                                        <CircleDashed className='w-6 h-6 mr-2 text-gray-400 mt-0.5 shrink-0' />
                                      )}
                                      <span className='text-sm'>
                                        {event.title}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className='flex justify-center mt-8 gap-2'>
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-primary/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
