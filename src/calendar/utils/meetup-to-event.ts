import { IEvent } from '../contexts/calendar-context';

interface Meetup {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  country: string;
  flag: string;
  category: string;
  type: string;
  image: string;
  organizedBy?: string;
}

export const convertMeetupsToEvents = (meetups: Meetup[]): IEvent[] => {
  const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange'];
  
  return meetups.map((meetup, index) => {
    // Parse the Spanish date format
    const parseSpanishDate = (dateStr: string): Date => {
      const monthMap: { [key: string]: number } = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
        'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      };
      
      // Handle format like "15 de Agosto, 2025"
      const parts = dateStr.toLowerCase().split(' de ');
      if (parts.length === 2) {
        const day = parseInt(parts[0]);
        const monthYear = parts[1].split(', ');
        const month = monthMap[monthYear[0]];
        const year = parseInt(monthYear[1]);
        
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          return new Date(year, month, day);
        }
      }
      
      // Fallback to current date if parsing fails
      return new Date();
    };
    
    const eventDate = parseSpanishDate(meetup.date);
    
    // Parse time format like "7pm - 10pm" or "7:00 PM - 10:00 PM"
    const parseTime = (timeStr: string): { start: number, end: number } => {
      const timeMatch = timeStr.match(/(\d{1,2})(?::\d{2})?\s*(am|pm)\s*-\s*(\d{1,2})(?::\d{2})?\s*(am|pm)/i);
      if (timeMatch) {
        const [, startHour, startPeriod, endHour, endPeriod] = timeMatch;
        
        let start24 = parseInt(startHour);
        let end24 = parseInt(endHour);
        
        if (startPeriod.toLowerCase() === 'pm' && start24 !== 12) start24 += 12;
        if (startPeriod.toLowerCase() === 'am' && start24 === 12) start24 = 0;
        if (endPeriod.toLowerCase() === 'pm' && end24 !== 12) end24 += 12;
        if (endPeriod.toLowerCase() === 'am' && end24 === 12) end24 = 0;
        
        return { start: start24, end: end24 };
      }
      
      // Fallback to default times
      return { start: 19, end: 21 }; // 7pm - 9pm
    };
    
    const times = parseTime(meetup.time);
    
    const startDate = new Date(eventDate);
    startDate.setHours(times.start, 0, 0, 0);
    
    const endDate = new Date(eventDate);
    endDate.setHours(times.end, 0, 0, 0);
    
    return {
      id: meetup.id.toString(),
      title: meetup.title,
      description: `${meetup.type} - ${meetup.category} meetup in ${meetup.location}`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      color: colors[index % colors.length] as "blue" | "green" | "red" | "yellow" | "purple" | "orange",
      user: {
        id: meetup.organizedBy || 'unknown',
        name: meetup.organizedBy || 'Organizer'
      }
    };
  });
};
