import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface IEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  color: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
  user: {
    id: string;
    name: string;
  };
}

export interface IUser {
  id: string;
  name: string;
  picturePath?: string; // Optional avatar image
}

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
  events: IEvent[];
  users: IUser[];
  badgeVariant: "dot" | "colored" | "mixed";
  setBadgeVariant: (variant: "dot" | "colored" | "mixed") => void;
  view: "day" | "week" | "month" | "year" | "agenda";
  setView: (view: "day" | "week" | "month" | "year" | "agenda") => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

interface CalendarProviderProps {
  children: ReactNode;
  events: IEvent[];
  users: IUser[];
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children, events, users }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [badgeVariant, setBadgeVariant] = useState<"dot" | "colored" | "mixed">("colored");
  const [view, setView] = useState<"day" | "week" | "month" | "year" | "agenda">("month");

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedUserId,
        setSelectedUserId,
        events,
        users,
        badgeVariant,
        setBadgeVariant,
        view,
        setView,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
