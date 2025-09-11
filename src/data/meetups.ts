export interface Meetup {
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

export const meetups: Meetup[] = [
  {
    id: 1,
    title: "Bitcoin Event",
    date: "15 of October",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Conference",
    type: "In-person",
    image: "/images/events-images/event1.png",
    organizedBy: "XYZ Community"
  },
  {
    id: 2,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Workshop",
    type: "Online",
    image: "/images/events-images/event2.png"
  },
  {
    id: 3,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Meetup",
    type: "In-person",
    image: "/images/events-images/event3.png",
    organizedBy: "XYZ Community"
  },
  {
    id: 4,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Conference",
    type: "Hybrid",
    image: "/images/events-images/event1.png"
  },
  {
    id: 5,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Workshop",
    type: "In-person",
    image: "/images/events-images/event2.png"
  },
  {
    id: 6,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Meetup",
    type: "Online",
    image: "/images/events-images/event3.png",
    organizedBy: "XYZ Community"
  },
  {
    id: 7,
    title: "Bitcoin Event",
    date: "September 3th",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Conference",
    type: "In-person",
    image: "/images/events-images/event1.png"
  },
  {
    id: 8,
    title: "Bitcoin Event",
    date: "15 of October",
    location: "Location of the event, with elipses...",
    time: "03 of Sep, 15:00 (3pm)",
    country: "Italy",
    flag: "🇮🇹",
    category: "Workshop",
    type: "Hybrid",
    image: "/images/events-images/event2.png"
  }
];

// Helper functions for filtering
export const getMeetupsByCategory = (category: string): Meetup[] => {
  return meetups.filter(meetup => meetup.category === category);
};

export const getMeetupsByType = (type: string): Meetup[] => {
  return meetups.filter(meetup => meetup.type === type);
};

export const getMeetupsByCountry = (country: string): Meetup[] => {
  return meetups.filter(meetup => meetup.country === country);
};

export const getUniqueCategories = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.category))];
};

export const getUniqueTypes = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.type))];
};

export const getUniqueCountries = (): string[] => {
  return [...new Set(meetups.map(meetup => meetup.country))];
};
