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
  // Additional fields for detailed meetup page
  description?: string;
  whatToExpect?: string[];
  whyAttend?: string[];
  slogan?: string;
  organizerCommunity?: {
    id: string;
    title: string;
    city: string;
    country: string;
    avatarImage?: string;
    backgroundImage?: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  ticketLink?: string;
  shareLink?: string;
}

// Emptied on purpose: meetups will come from new external sources (TBD).
// Pages, prerender, sitemap and OG generation all handle an empty list.
export const meetups: Meetup[] = [];

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

export const getMeetupById = (id: number): Meetup | undefined => {
  return meetups.find(meetup => meetup.id === id);
};
