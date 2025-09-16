import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addDays, addMonths, subMonths } from 'date-fns';
import { useCalendar } from '../../contexts/calendar-context';
import { Card as UICard, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { meetups } from '../../../data/meetups';

const MonthView: React.FC = () => {
  const { selectedDate, events, badgeVariant, setSelectedDate } = useCalendar();
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showCard, setShowCard] = useState(false);

  const goToPreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const isCurrentMonth = isSameMonth(selectedDate, new Date());

  // Get events for the current month
  const getEventsForCurrentMonth = () => {
    return events.filter(event => {
      try {
        const eventDate = new Date(event.startDate);
        return isSameMonth(eventDate, selectedDate);
      } catch (error) {
        return false;
      }
    });
  };

  const currentMonthEvents = getEventsForCurrentMonth();

  const handleEventHover = (event: any, mouseEvent: React.MouseEvent) => {
    setHoveredEvent(event);
    setHoverPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    setTimeout(() => setShowCard(true), 300); // Small delay to prevent flickering
  };

  const handleEventLeave = () => {
    setHoveredEvent(null);
    setShowCard(false);
  };

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      try {
        const eventDate = new Date(event.startDate);
        return isSameDay(eventDate, day);
      } catch (error) {
        console.error('Error parsing event date:', error);
        return false;
      }
    });
  };

  const getEventColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  // Floating card component
  const FloatingEventCard = () => {
    if (!hoveredEvent || !showCard) return null;

    // Find the original meetup data
    const originalMeetup = meetups.find(meetup => meetup.id.toString() === hoveredEvent.id);
    if (!originalMeetup) return null;

    return (
      <div
        className="fixed z-50 pointer-events-none transition-opacity duration-200"
        style={{
          left: Math.min(hoverPosition.x + 10, window.innerWidth - 340), // Prevent overflow
          top: Math.max(hoverPosition.y - 10, 10), // Prevent overflow at top
          transform: 'translateY(-100%)'
        }}
      >
        <UICard className="w-80 shadow-lg border-0 overflow-hidden">
          <div className="relative h-48">
            <img
              src={originalMeetup.image}
              alt={originalMeetup.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = parent.className.replace('overflow-hidden', '') + ' bg-gradient-to-br from-bitcoin to-yellow-500 flex items-center justify-center';
                  parent.innerHTML = `
                    <div class="text-center text-white">
                      <div class="text-white font-bold text-xs mb-1">BTC</div>
                      <div class="text-white font-bold text-xs">${originalMeetup.title.split(' ')[0]}</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
              {originalMeetup.title}
            </h3>
            <div className="flex items-center text-custom-gray text-sm mb-1">
              <span className="mr-2">{originalMeetup.flag}</span>
              <span>{originalMeetup.location}</span>
            </div>
            <div className="flex items-center text-custom-gray text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{originalMeetup.time}</span>
            </div>
          </CardContent>
        </UICard>
      </div>
    );
  };

  try {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <>
        <FloatingEventCard />
        <div className="bg-white rounded-lg shadow-sm border">
          {/* Calendar Header */}
        <div className="p-2 md:p-4 border-b">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousMonth}
                className="flex items-center hover:bg-gray-50 p-1 md:p-2"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
              <div className="text-center min-w-[120px] md:min-w-[200px]">
                <h2 className="text-sm md:text-xl font-semibold text-gray-900">
                  {format(selectedDate, 'MMM yyyy')}
                </h2>
                <div className="flex items-center justify-center mt-1">
                  <span className="inline-flex items-center px-1 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {currentMonthEvents.length} event{currentMonthEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextMonth}
                className="flex items-center hover:bg-gray-50 p-1 md:p-2"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
            <Button
              variant={isCurrentMonth ? "default" : "outline"}
              size="sm"
              onClick={goToToday}
              className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
            >
              Today
            </Button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 p-1 md:p-2 text-center text-xs md:text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {calendarDays.map((day, dayIdx) => {
            const dayEvents = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`bg-white min-h-[80px] md:min-h-[120px] p-1 md:p-2 ${
                  !isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                }`}
              >
                <div className={`text-xs md:text-sm font-medium mb-1 ${
                  isToday ? 'bg-blue-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center' : ''
                }`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-0.5 md:space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <Link
                      key={event.id}
                      to={`/meetup/${event.id}`}
                      className={`block text-xs p-0.5 md:p-1 rounded truncate transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-pointer ${
                        badgeVariant === 'colored' || badgeVariant === 'mixed'
                          ? `${getEventColor(event.color)} text-white hover:opacity-90`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={`Click to view ${event.title}`}
                      onMouseEnter={(e) => handleEventHover(event, e)}
                      onMouseLeave={handleEventLeave}
                    >
                      {badgeVariant === 'dot' ? (
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-1 ${getEventColor(event.color)}`} />
                          <span className="truncate">{event.title}</span>
                        </div>
                      ) : (
                        <div className="truncate">{event.title}</div>
                      )}
                    </Link>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error rendering calendar:', error);
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Calendar</h3>
        <p className="text-gray-600">There was an error loading the calendar view. Please try again.</p>
      </div>
    );
  }
};

export default MonthView;
