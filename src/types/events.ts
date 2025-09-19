export interface Event {
  title: string;
  isChecked: boolean;
}

export interface MonthEvent {
  month: string;
  year: number;
  events: Event[];
}

export interface TimelineEvent {
  year: number;
  month: string;
  periodType: "Q" | "H" | "Y";
  periodNumber: number;
  isChecked: boolean;
  events: Event[];
}

