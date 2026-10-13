import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCalendar, type IEvent } from '../../contexts/calendar-context';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const navBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-bitcoin hover:text-bitcoin focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin';

const MonthView: React.FC = () => {
  const { selectedDate, events, setSelectedDate } = useCalendar();
  const [hoveredEvent, setHoveredEvent] = useState<IEvent | null>(null);
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
      } catch {
        return false;
      }
    });
  };

  const currentMonthEvents = getEventsForCurrentMonth();

  const handleEventHover = (event: IEvent, mouseEvent: React.MouseEvent) => {
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

  // Floating card component
  const FloatingEventCard = () => {
    if (!hoveredEvent || !showCard) return null;

    const ev = hoveredEvent;

    return (
      <div
        className="pointer-events-none fixed z-50 transition-opacity duration-200"
        style={{
          left: Math.min(hoverPosition.x + 10, window.innerWidth - 340), // Prevent overflow
          top: Math.max(hoverPosition.y - 10, 10), // Prevent overflow at top
          transform: 'translateY(-100%)'
        }}
      >
        <div className="w-80 overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
          {ev.image && (
            <div className="relative h-40">
              <img src={ev.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
            </div>
          )}
          <div className="p-4">
            <h3 className="mb-2 font-bold leading-tight text-white">{ev.title}</h3>
            {ev.location && (
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 shrink-0 text-bitcoin" />
                <span className="truncate">{ev.location}</span>
              </div>
            )}
            {ev.timeLabel && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4 text-bitcoin" />
                <span>{ev.timeLabel}</span>
              </div>
            )}
          </div>
        </div>
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
        <div className="surface overflow-hidden">
          {/* Calendar Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <button type="button" onClick={goToPreviousMonth} className={navBtn} aria-label="Mes anterior">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="min-w-[9rem] text-center md:min-w-[14rem]">
                <h2 className="display text-2xl text-white md:text-4xl">
                  {format(selectedDate, 'MMMM yyyy', { locale: es })}
                </h2>
                <span className="mt-1 inline-block text-xs uppercase tracking-[0.18em] text-gray-400">
                  {currentMonthEvents.length} evento{currentMonthEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button type="button" onClick={goToNextMonth} className={navBtn} aria-label="Mes siguiente">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={goToToday}
              aria-pressed={isCurrentMonth}
              className={cn("chip", isCurrentMonth && "chip-active")}
            >
              Hoy
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-px border-b border-white/10">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500 md:py-3">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-white/[0.06]">
            {calendarDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const isCurrentMonth = isSameMonth(day, selectedDate);
              const isToday = isSameDay(day, new Date());

              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "min-h-[72px] bg-ink-950 p-1 md:min-h-[120px] md:p-2",
                    isCurrentMonth ? "text-gray-200" : "text-gray-600",
                    dayEvents.length > 0 && "bg-ink-900"
                  )}
                >
                  <div
                    className={cn(
                      "mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium md:h-7 md:w-7 md:text-sm",
                      isToday && "text-bitcoin ring-2 ring-bitcoin shadow-[0_0_14px_rgba(247,147,26,0.45)]"
                    )}
                  >
                    {format(day, 'd')}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <a
                        key={event.id}
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={event.title}
                        title={event.title}
                        className="block rounded-lg transition hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin md:bg-bitcoin md:px-2 md:py-1 md:text-xs md:font-semibold md:text-ink-950"
                        onMouseEnter={(e) => handleEventHover(event, e)}
                        onMouseLeave={handleEventLeave}
                      >
                        <span className="mx-auto block h-2 w-2 rounded-full bg-bitcoin md:hidden" />
                        <span className="hidden truncate md:block">{event.title}</span>
                      </a>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[10px] text-gray-500 md:text-xs">+{dayEvents.length - 2} más</div>
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
      <div className="surface p-8 text-center">
        <h3 className="mb-2 text-lg font-bold text-white">Error al cargar el calendario</h3>
        <p className="text-gray-400">Hubo un error al mostrar el calendario. Probá de nuevo.</p>
      </div>
    );
  }
};

export default MonthView;
